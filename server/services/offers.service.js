import { prisma } from '../utils/prisma.js';
import { isOfferable, isPubliclyVisible } from '../utils/productStatus.js';
import { ACTIVE_OFFER_STATUSES, OPEN_OFFER_STATUSES, OFFER_STATUS_LABELS, canTransition } from '../utils/offerStatus.js';

// ---------- serializers ----------

function serializePublicAggregate(offers) {
  const active = offers.filter((o) => ACTIVE_OFFER_STATUSES.includes(o.status));
  const highest = active.reduce((max, o) => Math.max(max, Number(o.currentAmount)), 0);
  return { count: active.length, highestAmount: active.length ? highest : null };
}

function serializeEventRedacted(e) {
  return {
    status: e.status,
    amount: e.amount != null ? Number(e.amount) : null,
    reason: e.reason,
    createdAt: e.createdAt,
  };
}

function serializeEventFull(e) {
  return {
    id: e.id,
    status: e.status,
    amount: e.amount != null ? Number(e.amount) : null,
    reason: e.reason,
    actionedBy: e.actionedBy ? { name: e.actionedBy.name, role: e.actionedBy.role } : null,
    ipMeta: e.ipMeta,
    createdAt: e.createdAt,
  };
}

function sortEvents(events) {
  return [...(events || [])].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

function serializeOfferRedacted(offer) {
  return {
    id: offer.id,
    status: offer.status,
    originalAmount: Number(offer.originalAmount),
    currentAmount: Number(offer.currentAmount),
    message: offer.message,
    createdAt: offer.createdAt,
    updatedAt: offer.updatedAt,
    events: sortEvents(offer.events).map(serializeEventRedacted),
  };
}

function serializeOfferFull(offer) {
  return {
    id: offer.id,
    buyerName: offer.buyerName,
    buyerEmail: offer.buyerEmail,
    buyerPhone: offer.buyerPhone,
    message: offer.message,
    preferredContact: offer.preferredContact,
    shippingLocation: offer.shippingLocation,
    originalAmount: Number(offer.originalAmount),
    currentAmount: Number(offer.currentAmount),
    status: offer.status,
    expiresAt: offer.expiresAt,
    createdAt: offer.createdAt,
    updatedAt: offer.updatedAt,
    events: sortEvents(offer.events).map(serializeEventFull),
  };
}

// ---------- checkout: cart items -> real offers ----------

export async function submitOffers(userId, data) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    const err = new Error('User not found.');
    err.status = 404;
    throw err;
  }

  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    const err = new Error('Your cart is empty.');
    err.status = 400;
    throw err;
  }

  const items = await prisma.cartItem.findMany({
    where: { id: { in: data.itemIds }, cartId: cart.id },
    include: { product: true },
  });

  if (items.length === 0) {
    const err = new Error('No matching cart items found.');
    err.status = 400;
    throw err;
  }

  const notOfferable = items.find((i) => !isOfferable(i.product.status));
  if (notOfferable) {
    const err = new Error(`"${notOfferable.product.name}" is no longer open to offers. Please remove it from your cart.`);
    err.status = 400;
    throw err;
  }

  const missingAmount = items.find((i) => !i.draftAmount || Number(i.draftAmount) <= 0);
  if (missingAmount) {
    const err = new Error(`Enter an offer amount for "${missingAmount.product.name}" before submitting.`);
    err.status = 400;
    throw err;
  }

  const offerIds = await prisma.$transaction(async (tx) => {
    const ids = [];
    for (const item of items) {
      const offer = await tx.offer.create({
        data: {
          productId: item.productId,
          buyerName: user.name || 'CraftGuard Buyer',
          buyerEmail: user.email,
          buyerPhone: data.phone,
          message: data.message || null,
          preferredContact: data.preferredContact || null,
          shippingLocation: data.shippingLocation || null,
          originalAmount: item.draftAmount,
          currentAmount: item.draftAmount,
          consentGiven: true,
          termsAccepted: true,
        },
      });
      await tx.offerEvent.create({
        data: { offerId: offer.id, status: 'PENDING', amount: item.draftAmount, actionedById: userId },
      });
      if (['PUBLISHED', 'AVAILABLE'].includes(item.product.status)) {
        await tx.product.update({ where: { id: item.productId }, data: { status: 'OFFER_PENDING' } });
      }
      await tx.cartItem.delete({ where: { id: item.id } });
      ids.push(offer.id);
    }
    return ids;
  });

  return { submitted: offerIds.length };
}

// ---------- viewer-aware single-product offers ----------

export async function getOffersForProductViewer(slug, viewer) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      artisan: true,
      offers: { include: { events: { include: { actionedBy: true } } }, orderBy: { createdAt: 'desc' } },
    },
  });

  if (!product) {
    const err = new Error('Product not found.');
    err.status = 404;
    throw err;
  }

  const isAdmin = !!viewer && ['ADMIN', 'SUPER_ADMIN'].includes(viewer.role);
  const isOwner = !!viewer && viewer.role === 'ARTISAN' && product.artisan?.userId === viewer.sub;

  if (!isAdmin && !isOwner && !isPubliclyVisible(product.status)) {
    const err = new Error('Product not found.');
    err.status = 404;
    throw err;
  }

  if (isAdmin || isOwner) {
    const toMarkViewed = product.offers.filter((o) => o.status === 'PENDING');
    if (toMarkViewed.length > 0) {
      await prisma.$transaction(async (tx) => {
        for (const offer of toMarkViewed) {
          await tx.offer.update({ where: { id: offer.id }, data: { status: 'VIEWED' } });
          await tx.offerEvent.create({ data: { offerId: offer.id, status: 'VIEWED', actionedById: viewer.sub } });
        }
      });
      product.offers = await prisma.offer.findMany({
        where: { productId: product.id },
        include: { events: { include: { actionedBy: true } } },
        orderBy: { createdAt: 'desc' },
      });
    }

    return {
      viewerType: isAdmin ? 'admin' : 'owner',
      productId: product.id,
      productName: product.name,
      offers: product.offers.map(serializeOfferFull),
    };
  }

  const aggregate = serializePublicAggregate(product.offers);

  if (!viewer) {
    return { viewerType: 'guest', aggregate, myOffer: null };
  }

  const mine = product.offers.find((o) => o.buyerEmail === viewer.email);
  if (mine) {
    return { viewerType: 'buyer_with_offer', aggregate, myOffer: serializeOfferRedacted(mine) };
  }

  return { viewerType: 'buyer', aggregate, myOffer: null };
}

// ---------- "my offers" account page ----------

export async function getMyOffers(userEmail) {
  const offers = await prisma.offer.findMany({
    where: { buyerEmail: userEmail },
    include: {
      product: { include: { images: { include: { mediaAsset: true } } } },
      events: { include: { actionedBy: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return offers.map((o) => {
    const image = [...o.product.images].sort((a, b) => a.displayOrder - b.displayOrder)[0];
    return {
      ...serializeOfferRedacted(o),
      product: {
        id: o.product.id,
        name: o.product.name,
        slug: o.product.slug,
        craft: o.product.craft,
        image: image
          ? { url: image.mediaAsset?.uploadStatus === 'UPLOADED' ? `/media/${image.mediaAsset.storageKey}` : null, altText: image.altText }
          : null,
      },
    };
  });
}

// ---------- accept / reject / counter ----------

export async function performOfferAction(offerId, viewer, data) {
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: { product: { include: { artisan: true } } },
  });
  if (!offer) {
    const err = new Error('Offer not found.');
    err.status = 404;
    throw err;
  }

  const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(viewer.role);
  const isOwner = viewer.role === 'ARTISAN' && offer.product.artisan?.userId === viewer.sub;
  if (!isAdmin && !isOwner) {
    const err = new Error('You do not have permission to manage this offer.');
    err.status = 403;
    throw err;
  }

  if (!canTransition(offer.status, data.action)) {
    const err = new Error(`This offer cannot be ${data.action.toLowerCase()}ed in its current state (${OFFER_STATUS_LABELS[offer.status]}).`);
    err.status = 400;
    throw err;
  }

  await prisma.$transaction(async (tx) => {
    if (data.action === 'ACCEPT') {
      await tx.offer.update({ where: { id: offer.id }, data: { status: 'ACCEPTED' } });
      await tx.offerEvent.create({
        data: { offerId: offer.id, status: 'ACCEPTED', amount: offer.currentAmount, reason: data.reason || null, actionedById: viewer.sub },
      });
      await tx.product.update({ where: { id: offer.productId }, data: { status: 'OFFER_ACCEPTED' } });

      const others = await tx.offer.findMany({
        where: { productId: offer.productId, id: { not: offer.id }, status: { in: OPEN_OFFER_STATUSES } },
      });
      for (const other of others) {
        await tx.offer.update({ where: { id: other.id }, data: { status: 'REJECTED' } });
        await tx.offerEvent.create({
          data: { offerId: other.id, status: 'REJECTED', reason: 'Another offer was accepted for this item.', actionedById: viewer.sub },
        });
      }
    }

    if (data.action === 'REJECT') {
      await tx.offer.update({ where: { id: offer.id }, data: { status: 'REJECTED' } });
      await tx.offerEvent.create({
        data: { offerId: offer.id, status: 'REJECTED', reason: data.reason || null, actionedById: viewer.sub },
      });

      const remainingActive = await tx.offer.count({
        where: { productId: offer.productId, id: { not: offer.id }, status: { in: OPEN_OFFER_STATUSES } },
      });
      if (remainingActive === 0) {
        const product = await tx.product.findUnique({ where: { id: offer.productId } });
        if (product.status === 'OFFER_PENDING') {
          await tx.product.update({ where: { id: offer.productId }, data: { status: 'AVAILABLE' } });
        }
      }
    }

    if (data.action === 'COUNTER') {
      await tx.offer.update({ where: { id: offer.id }, data: { status: 'COUNTERED', currentAmount: data.counterAmount } });
      await tx.offerEvent.create({
        data: { offerId: offer.id, status: 'COUNTERED', amount: data.counterAmount, reason: data.reason || null, actionedById: viewer.sub },
      });
    }
  });

  const result = await prisma.offer.findUnique({
    where: { id: offer.id },
    include: { events: { include: { actionedBy: true } } },
  });
  return serializeOfferFull(result);
}

// ---------- audit trail ----------

export async function getOfferEventsFull(offerId, viewer) {
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: {
      product: { include: { artisan: true } },
      events: { include: { actionedBy: true }, orderBy: { createdAt: 'asc' } },
    },
  });
  if (!offer) {
    const err = new Error('Offer not found.');
    err.status = 404;
    throw err;
  }
  const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(viewer.role);
  const isOwner = viewer.role === 'ARTISAN' && offer.product.artisan?.userId === viewer.sub;
  if (!isAdmin && !isOwner) {
    const err = new Error('You do not have permission to view this.');
    err.status = 403;
    throw err;
  }
  return offer.events.map(serializeEventFull);
}

// ---------- admin: all offers ----------

const VALID_STATUSES = ['PENDING', 'VIEWED', 'COUNTERED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN', 'EXPIRED', 'COMPLETED'];

export async function getAllOffersForAdmin({ page = 1, pageSize = 20, status } = {}) {
  const where = VALID_STATUSES.includes(status) ? { status } : {};
  const skip = (page - 1) * pageSize;

  const [offers, total] = await Promise.all([
    prisma.offer.findMany({
      where,
      include: { product: true, events: { include: { actionedBy: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.offer.count({ where }),
  ]);

  return {
    items: offers.map((o) => ({
      ...serializeOfferFull(o),
      product: { id: o.product.id, name: o.product.name, slug: o.product.slug, craft: o.product.craft },
    })),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}