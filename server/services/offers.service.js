import { prisma } from '../utils/prisma.js';
import { isOfferable, isPubliclyVisible } from '../utils/productStatus.js';
import { ACTIVE_OFFER_STATUSES, OPEN_OFFER_STATUSES, OFFER_STATUS_LABELS, canTransition } from '../utils/offerStatus.js';
import { logAudit } from '../utils/audit.js';
import { createNotifications } from '../utils/notify.js';

function serializePublicAggregate(offers) {
  const active = offers.filter((o) => ACTIVE_OFFER_STATUSES.includes(o.status));
  const highest = active.reduce((max, o) => Math.max(max, Number(o.currentAmount)), 0);
  return { count: active.length, highestAmount: active.length ? highest : null };
}

function serializeEventRedacted(e) {
  return { status: e.status, amount: e.amount != null ? Number(e.amount) : null, reason: e.reason, createdAt: e.createdAt };
}

function serializeEventFull(e) {
  return {
    id: e.id, status: e.status, amount: e.amount != null ? Number(e.amount) : null, reason: e.reason,
    actionedBy: e.actionedBy ? { name: e.actionedBy.name, role: e.actionedBy.role } : null,
    ipMeta: e.ipMeta, createdAt: e.createdAt,
  };
}

function sortEvents(events) {
  return [...(events || [])].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

function serializeOfferRedacted(offer) {
  return {
    id: offer.id, status: offer.status, originalAmount: Number(offer.originalAmount), currentAmount: Number(offer.currentAmount),
    message: offer.message, createdAt: offer.createdAt, updatedAt: offer.updatedAt,
    events: sortEvents(offer.events).map(serializeEventRedacted),
  };
}

function serializeOfferFull(offer) {
  return {
    id: offer.id, buyerName: offer.buyerName, buyerEmail: offer.buyerEmail, buyerPhone: offer.buyerPhone,
    message: offer.message, preferredContact: offer.preferredContact, shippingLocation: offer.shippingLocation,
    originalAmount: Number(offer.originalAmount), currentAmount: Number(offer.currentAmount), status: offer.status,
    expiresAt: offer.expiresAt, createdAt: offer.createdAt, updatedAt: offer.updatedAt,
    events: sortEvents(offer.events).map(serializeEventFull),
  };
}

// ---------- Phase 9: notification helpers ----------

async function resolveBuyerUserId(offerLike) {
  if (offerLike.buyerId) return offerLike.buyerId;
  // Fallback for any offer rows created before buyerId existed.
  const u = await prisma.user.findUnique({ where: { email: offerLike.buyerEmail }, select: { id: true } });
  return u?.id || null;
}

async function notifyNewOffers(items, offerMetas) {
  const admins = await prisma.user.findMany({
    where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] }, isActive: true },
    select: { id: true },
  });

  const notifications = [];

  for (const meta of offerMetas) {
    const item = items.find((i) => i.productId === meta.productId);
    const artisanUserId = item?.product?.artisan?.userId || null;
    const formattedAmount = meta.amount.toLocaleString('en-IN');

    if (artisanUserId) {
      notifications.push({
        userId: artisanUserId, type: 'OFFER_RECEIVED', title: 'New offer received',
        message: `You received an offer of ₹${formattedAmount} for "${meta.productName}".`,
        link: '/artisan/dashboard', payload: { offerId: meta.offerId, productId: meta.productId },
      });
    }

    for (const admin of admins) {
      notifications.push({
        userId: admin.id, type: 'OFFER_RECEIVED', title: 'New offer submitted',
        message: `A new offer of ₹${formattedAmount} was submitted for "${meta.productName}".`,
        link: '/admin', payload: { offerId: meta.offerId, productId: meta.productId },
      });
    }
  }

  await createNotifications(notifications);
}

async function notifyOfferAction({ offer, action, counterAmount, autoRejectedOfferIds }) {
  const productName = offer.product.name;
  const notifications = [];

  const buyerUserId = await resolveBuyerUserId(offer);
  if (buyerUserId) {
    if (action === 'ACCEPT') {
      notifications.push({
        userId: buyerUserId, type: 'OFFER_ACCEPTED', title: 'Your offer was accepted',
        message: `Your offer for "${productName}" was accepted. The artisan will be in touch to arrange next steps.`,
        link: '/account', payload: { offerId: offer.id, productId: offer.productId },
      });
    } else if (action === 'REJECT') {
      notifications.push({
        userId: buyerUserId, type: 'OFFER_REJECTED', title: 'Offer update',
        message: `Your offer for "${productName}" was declined.`,
        link: '/account', payload: { offerId: offer.id, productId: offer.productId },
      });
    } else if (action === 'COUNTER') {
      notifications.push({
        userId: buyerUserId, type: 'OFFER_COUNTERED', title: 'Counter-offer received',
        message: `You received a counter-offer of ₹${Number(counterAmount).toLocaleString('en-IN')} for "${productName}".`,
        link: '/account', payload: { offerId: offer.id, productId: offer.productId },
      });
    }
  }

  if (autoRejectedOfferIds?.length) {
    const others = await prisma.offer.findMany({ where: { id: { in: autoRejectedOfferIds } } });
    for (const other of others) {
      const otherBuyerId = await resolveBuyerUserId(other);
      if (otherBuyerId) {
        notifications.push({
          userId: otherBuyerId, type: 'OFFER_REJECTED', title: 'Offer update',
          message: `Your offer for "${productName}" was declined — another offer was accepted.`,
          link: '/account', payload: { offerId: other.id, productId: offer.productId },
        });
      }
    }
  }

  await createNotifications(notifications);
}

// ---------- existing exports (unchanged behavior, notification hooks added) ----------

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
    include: { product: { include: { artisan: true } } },
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

  const offerMetas = await prisma.$transaction(async (tx) => {
    const metas = [];
    for (const item of items) {
      const offer = await tx.offer.create({
        data: {
          productId: item.productId, buyerId: userId, buyerName: user.name || 'CraftGuard Buyer', buyerEmail: user.email,
          buyerPhone: data.phone, message: data.message || null, preferredContact: data.preferredContact || null,
          shippingLocation: data.shippingLocation || null, originalAmount: item.draftAmount, currentAmount: item.draftAmount,
          consentGiven: true, termsAccepted: true,
        },
      });
      await tx.offerEvent.create({ data: { offerId: offer.id, status: 'PENDING', amount: item.draftAmount, actionedById: userId } });
      if (['PUBLISHED', 'AVAILABLE'].includes(item.product.status)) {
        await tx.product.update({ where: { id: item.productId }, data: { status: 'OFFER_PENDING' } });
      }
      await tx.cartItem.delete({ where: { id: item.id } });
      metas.push({ offerId: offer.id, productId: item.productId, productName: item.product.name, amount: Number(item.draftAmount) });
    }
    return metas;
  });

  await logAudit({ userId, action: 'OFFERS_SUBMITTED', entityType: 'Product', metadata: { offerIds: offerMetas.map((m) => m.offerId), count: offerMetas.length } });

  notifyNewOffers(items, offerMetas).catch((err) => console.error('notifyNewOffers failed:', err));

  return { submitted: offerMetas.length };
}

export async function getOffersForProductViewer(slug, viewer) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { artisan: true, offers: { include: { events: { include: { actionedBy: true } } }, orderBy: { createdAt: 'desc' } } },
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
        where: { productId: product.id }, include: { events: { include: { actionedBy: true } } }, orderBy: { createdAt: 'desc' },
      });
    }

    return { viewerType: isAdmin ? 'admin' : 'owner', productId: product.id, productName: product.name, offers: product.offers.map(serializeOfferFull) };
  }

  const aggregate = serializePublicAggregate(product.offers);

  if (!viewer) return { viewerType: 'guest', aggregate, myOffer: null };

  const mine = product.offers.find((o) => o.buyerEmail === viewer.email);
  if (mine) return { viewerType: 'buyer_with_offer', aggregate, myOffer: serializeOfferRedacted(mine) };

  return { viewerType: 'buyer', aggregate, myOffer: null };
}

export async function getMyOffers(userEmail) {
  const offers = await prisma.offer.findMany({
    where: { buyerEmail: userEmail },
    include: { product: { include: { images: { include: { mediaAsset: true } } } }, events: { include: { actionedBy: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return offers.map((o) => {
    const image = [...o.product.images].sort((a, b) => a.displayOrder - b.displayOrder)[0];
    return {
      ...serializeOfferRedacted(o),
      product: {
        id: o.product.id, name: o.product.name, slug: o.product.slug, craft: o.product.craft,
        image: image ? { url: image.mediaAsset?.uploadStatus === 'UPLOADED' ? `/media/${image.mediaAsset.storageKey}` : null, altText: image.altText } : null,
      },
    };
  });
}

export async function performOfferAction(offerId, viewer, data) {
  const offer = await prisma.offer.findUnique({ where: { id: offerId }, include: { product: { include: { artisan: true } } } });
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

  const autoRejectedOfferIds = [];

  await prisma.$transaction(async (tx) => {
    if (data.action === 'ACCEPT') {
      await tx.offer.update({ where: { id: offer.id }, data: { status: 'ACCEPTED' } });
      await tx.offerEvent.create({ data: { offerId: offer.id, status: 'ACCEPTED', amount: offer.currentAmount, reason: data.reason || null, actionedById: viewer.sub } });
      await tx.product.update({ where: { id: offer.productId }, data: { status: 'OFFER_ACCEPTED' } });

      const others = await tx.offer.findMany({ where: { productId: offer.productId, id: { not: offer.id }, status: { in: OPEN_OFFER_STATUSES } } });
      for (const other of others) {
        await tx.offer.update({ where: { id: other.id }, data: { status: 'REJECTED' } });
        await tx.offerEvent.create({ data: { offerId: other.id, status: 'REJECTED', reason: 'Another offer was accepted for this item.', actionedById: viewer.sub } });
        autoRejectedOfferIds.push(other.id);
      }
    }

    if (data.action === 'REJECT') {
      await tx.offer.update({ where: { id: offer.id }, data: { status: 'REJECTED' } });
      await tx.offerEvent.create({ data: { offerId: offer.id, status: 'REJECTED', reason: data.reason || null, actionedById: viewer.sub } });

      const remainingActive = await tx.offer.count({ where: { productId: offer.productId, id: { not: offer.id }, status: { in: OPEN_OFFER_STATUSES } } });
      if (remainingActive === 0) {
        const product = await tx.product.findUnique({ where: { id: offer.productId } });
        if (product.status === 'OFFER_PENDING') {
          await tx.product.update({ where: { id: offer.productId }, data: { status: 'AVAILABLE' } });
        }
      }
    }

    if (data.action === 'COUNTER') {
      await tx.offer.update({ where: { id: offer.id }, data: { status: 'COUNTERED', currentAmount: data.counterAmount } });
      await tx.offerEvent.create({ data: { offerId: offer.id, status: 'COUNTERED', amount: data.counterAmount, reason: data.reason || null, actionedById: viewer.sub } });
    }
  });

  await logAudit({
    userId: viewer.sub, action: `OFFER_${data.action}`, entityType: 'Offer', entityId: offer.id,
    metadata: { productId: offer.productId, amount: data.counterAmount ?? Number(offer.currentAmount), reason: data.reason || null },
  });

  const result = await prisma.offer.findUnique({ where: { id: offer.id }, include: { events: { include: { actionedBy: true } } } });

  notifyOfferAction({ offer, action: data.action, counterAmount: data.counterAmount, autoRejectedOfferIds }).catch((err) => console.error('notifyOfferAction failed:', err));

  return serializeOfferFull(result);
}

export async function getOfferEventsFull(offerId, viewer) {
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: { product: { include: { artisan: true } }, events: { include: { actionedBy: true }, orderBy: { createdAt: 'asc' } } },
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

const VALID_STATUSES = ['PENDING', 'VIEWED', 'COUNTERED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN', 'EXPIRED', 'COMPLETED'];

export async function getAllOffersForAdmin({ page = 1, pageSize = 20, status } = {}) {
  const where = VALID_STATUSES.includes(status) ? { status } : {};
  const skip = (page - 1) * pageSize;

  const [offers, total] = await Promise.all([
    prisma.offer.findMany({ where, include: { product: true, events: { include: { actionedBy: true } } }, orderBy: { createdAt: 'desc' }, skip, take: pageSize }),
    prisma.offer.count({ where }),
  ]);

  return {
    items: offers.map((o) => ({ ...serializeOfferFull(o), product: { id: o.product.id, name: o.product.name, slug: o.product.slug, craft: o.product.craft } })),
    total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}