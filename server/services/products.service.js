import { prisma } from '../utils/prisma.js';
import { isPubliclyVisible, toAvailabilityLabel, isOfferable, PUBLIC_VISIBLE_STATUSES } from '../utils/productStatus.js';
import { resolveMediaUrl } from '../utils/media.js';
import { generateUniqueSlug } from '../utils/slug.js'
import { uploadImageBuffer, deleteImage } from './storage.service.js';
import { ensureArtisanProfile } from './artisans.service.js';

const AVAILABILITY_STATUS_MAP = {
  available: ['PUBLISHED', 'AVAILABLE'],
  offer_submitted: ['OFFER_PENDING'],
  sold: ['SOLD'],
};

const SORT_MAP = {
  featured: [{ featured: 'desc' }, { createdAt: 'desc' }],
  newest: [{ createdAt: 'desc' }],
  price_asc: [{ price: 'asc' }],
  price_desc: [{ price: 'desc' }],
};

const BLOCKED_UNPUBLISH_STATUSES = ['OFFER_PENDING', 'OFFER_ACCEPTED', 'RESERVED', 'SOLD'];

function serializeProduct(product, { detail = false } = {}) {
  const images = [...product.images]
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((img) => ({
      id: img.id,
      altText: img.altText,
      displayOrder: img.displayOrder,
      url: resolveMediaUrl(img.mediaAsset),
    }));

  const base = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    craft: product.craft,
    price: product.price ? Number(product.price) : null,
    currency: product.currency,
    status: toAvailabilityLabel(product.status),
    offerable: isOfferable(product.status),
    featured: product.featured,
    images,
    maker:
      product.makerVisible && product.artisan
        ? { name: product.artisan.publicDisplayName || null, location: product.artisan.location || null }
        : null,
  };

  if (!detail) return base;

  return {
    ...base,
    description: product.description,
    story: product.story,
    material: product.material,
    technique: product.technique,
    motif: product.motif,
    dimensions: product.dimensions,
    colour: product.colour,
    makingTimeApprox: product.makingTimeApprox,
    origin: product.origin,
    provenance: product.provenance,
    shippingInfo: product.shippingInfo,
    reservePrice: product.reservePrice ? Number(product.reservePrice) : null,
  };
}

function serializeProductForManage(product) {
  const images = [...product.images]
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((img) => ({ id: img.id, altText: img.altText, displayOrder: img.displayOrder, url: resolveMediaUrl(img.mediaAsset) }));

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    craft: product.craft,
    description: product.description,
    story: product.story,
    material: product.material,
    technique: product.technique,
    motif: product.motif,
    dimensions: product.dimensions,
    colour: product.colour,
    makingTimeApprox: product.makingTimeApprox,
    origin: product.origin,
    price: product.price ? Number(product.price) : null,
    reservePrice: product.reservePrice ? Number(product.reservePrice) : null,
    currency: product.currency,
    status: product.status,
    published: product.published,
    featured: product.featured,
    makerVisible: product.makerVisible,
    provenance: product.provenance,
    shippingInfo: product.shippingInfo,
    images,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

function assertOwnerOrAdmin(product, viewer) {
  const isAdmin = !!viewer && ['ADMIN', 'SUPER_ADMIN'].includes(viewer.role);
  const isOwner = !!viewer && viewer.role === 'ARTISAN' && product.artisan?.userId === viewer.sub;
  if (!isAdmin && !isOwner) {
    const err = new Error('You do not have permission to manage this product.');
    err.status = 403;
    throw err;
  }
  return { isAdmin, isOwner };
}

// ---------- public catalogue ----------

export async function listProducts({ craft, availability, sort = 'featured', page = 1, pageSize = 12, excludeSlug }) {
  const where = { status: { in: PUBLIC_VISIBLE_STATUSES } };

  if (craft && ['KASUTI', 'ILKAL'].includes(craft.toUpperCase())) where.craft = craft.toUpperCase();
  if (availability && AVAILABILITY_STATUS_MAP[availability]) where.status = { in: AVAILABILITY_STATUS_MAP[availability] };
  if (excludeSlug) where.slug = { not: excludeSlug };

  const orderBy = SORT_MAP[sort] || SORT_MAP.featured;
  const skip = (page - 1) * pageSize;

  const [items, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip, take: pageSize, include: { images: { include: { mediaAsset: true } }, artisan: true } }),
    prisma.product.count({ where }),
  ]);

  return { items: items.map((p) => serializeProduct(p)), total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}

export async function getProductBySlug(slug) {
  const product = await prisma.product.findUnique({ where: { slug }, include: { images: { include: { mediaAsset: true } }, artisan: true } });
  if (!product || !isPubliclyVisible(product.status)) return null;
  return serializeProduct(product, { detail: true });
}

export async function getFeaturedProducts(limit = 3) {
  const items = await prisma.product.findMany({
    where: { status: { in: PUBLIC_VISIBLE_STATUSES }, featured: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: { images: { include: { mediaAsset: true } }, artisan: true },
  });
  return items.map((p) => serializeProduct(p));
}

// ---------- artisan: my products ----------

export async function getMyProducts(userId) {
  const artisanProfile = await prisma.artisanProfile.findUnique({ where: { userId } });
  if (!artisanProfile) return [];

  const products = await prisma.product.findMany({
    where: { artisanId: artisanProfile.id },
    include: { images: { include: { mediaAsset: true } }, offers: true },
    orderBy: { createdAt: 'desc' },
  });

  return products.map((p) => {
    const active = p.offers.filter((o) => ['PENDING', 'VIEWED', 'COUNTERED', 'ACCEPTED'].includes(o.status));
    const pendingCount = p.offers.filter((o) => ['PENDING', 'VIEWED'].includes(o.status)).length;
    const highest = active.reduce((max, o) => Math.max(max, Number(o.currentAmount)), 0);
    const image = [...p.images].sort((a, b) => a.displayOrder - b.displayOrder)[0];
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      craft: p.craft,
      price: p.price ? Number(p.price) : null,
      status: toAvailabilityLabel(p.status),
      rawStatus: p.status,
      published: p.published,
      image: image ? { url: resolveMediaUrl(image.mediaAsset), altText: image.altText } : null,
      offerCount: p.offers.length,
      pendingCount,
      highestActiveOffer: active.length ? highest : null,
    };
  });
}

// ---------- artisan: create / edit / archive ----------

export async function createProduct(userId, data) {
  const artisanProfile = await ensureArtisanProfile(userId);
  const slug = await generateUniqueSlug(prisma, data.name);
  const status = data.published ? 'PUBLISHED' : 'DRAFT';

  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug,
      craft: data.craft,
      description: data.description || null,
      story: data.story || null,
      material: data.material || null,
      technique: data.technique || null,
      motif: data.motif || null,
      dimensions: data.dimensions || null,
      colour: data.colour || null,
      makingTimeApprox: data.makingTimeApprox || null,
      origin: data.origin || null,
      price: data.price,
      reservePrice: data.reservePrice ?? null,
      provenance: data.provenance || null,
      shippingInfo: data.shippingInfo || null,
      makerVisible: data.makerVisible ?? false,
      published: !!data.published,
      status,
      artisanId: artisanProfile.id,
    },
    include: { images: { include: { mediaAsset: true } }, artisan: true },
  });

  return serializeProductForManage(product);
}

export async function getProductForManage(productId, viewer) {
  const product = await prisma.product.findUnique({ where: { id: productId }, include: { images: { include: { mediaAsset: true } }, artisan: true } });
  if (!product) {
    const err = new Error('Product not found.');
    err.status = 404;
    throw err;
  }
  assertOwnerOrAdmin(product, viewer);
  return serializeProductForManage(product);
}

export async function updateProduct(productId, viewer, data) {
  const product = await prisma.product.findUnique({ where: { id: productId }, include: { artisan: true } });
  if (!product) {
    const err = new Error('Product not found.');
    err.status = 404;
    throw err;
  }
  assertOwnerOrAdmin(product, viewer);

  if (product.status === 'SOLD' || product.status === 'ARCHIVED') {
    const onlyTogglingPublish = Object.keys(data).every((k) => k === 'published');
    if (!onlyTogglingPublish) {
      const err = new Error(`This product is ${product.status.toLowerCase()} and its details can no longer be edited.`);
      err.status = 400;
      throw err;
    }
  }

  const updateData = {};
  const fields = ['name', 'description', 'story', 'material', 'technique', 'motif', 'dimensions', 'colour', 'makingTimeApprox', 'origin', 'price', 'reservePrice', 'provenance', 'shippingInfo', 'makerVisible', 'craft'];
  for (const field of fields) {
    if (data[field] !== undefined) updateData[field] = data[field] === '' ? null : data[field];
  }

  if (data.published !== undefined) {
    if (data.published === true) {
      if (product.status === 'ARCHIVED') {
        updateData.status = 'DRAFT';
        updateData.published = false;
      } else if (product.status === 'DRAFT') {
        updateData.status = 'PUBLISHED';
        updateData.published = true;
      } else {
        updateData.published = true;
      }
    } else {
      if (BLOCKED_UNPUBLISH_STATUSES.includes(product.status)) {
        const err = new Error('This product has active offers or is reserved/sold and cannot be unpublished right now.');
        err.status = 400;
        throw err;
      }
      updateData.status = 'DRAFT';
      updateData.published = false;
    }
  }

  const updated = await prisma.product.update({
    where: { id: productId },
    data: updateData,
    include: { images: { include: { mediaAsset: true } }, artisan: true },
  });

  return serializeProductForManage(updated);
}

export async function archiveProduct(productId, viewer) {
  const product = await prisma.product.findUnique({ where: { id: productId }, include: { artisan: true, offers: true } });
  if (!product) {
    const err = new Error('Product not found.');
    err.status = 404;
    throw err;
  }
  const { isAdmin } = assertOwnerOrAdmin(product, viewer);

  const hasOpenOffers = product.offers.some((o) => ['PENDING', 'VIEWED', 'COUNTERED'].includes(o.status));
  if (hasOpenOffers && !isAdmin) {
    const err = new Error('Resolve all open offers (accept, counter or decline) before archiving this product.');
    err.status = 400;
    throw err;
  }

  await prisma.product.update({ where: { id: productId }, data: { status: 'ARCHIVED', published: false } });
  return { archived: true };
}

// ---------- artisan: images ----------

export async function addProductImage(productId, viewer, file, altText) {
  const product = await prisma.product.findUnique({ where: { id: productId }, include: { artisan: true, images: true } });
  if (!product) {
    const err = new Error('Product not found.');
    err.status = 404;
    throw err;
  }
  assertOwnerOrAdmin(product, viewer);
  if (!file) {
    const err = new Error('An image file is required.');
    err.status = 400;
    throw err;
  }

  const result = await uploadImageBuffer(file.buffer, 'craftguard/products');

  const mediaAsset = await prisma.mediaAsset.create({
    data: {
      originalFilename: file.originalname,
      storageKey: result.public_id,
      mimeType: file.mimetype,
      width: result.width,
      height: result.height,
      fileSize: file.size,
      altText: altText || product.name,
      uploadStatus: 'UPLOADED',
    },
  });

  const maxOrder = product.images.reduce((max, i) => Math.max(max, i.displayOrder), -1);

  const image = await prisma.productImage.create({
    data: { productId, mediaAssetId: mediaAsset.id, altText: altText || product.name, displayOrder: maxOrder + 1 },
    include: { mediaAsset: true },
  });

  return { id: image.id, altText: image.altText, displayOrder: image.displayOrder, url: resolveMediaUrl(image.mediaAsset) };
}

export async function updateProductImage(productId, imageId, viewer, data) {
  const product = await prisma.product.findUnique({ where: { id: productId }, include: { artisan: true } });
  if (!product) {
    const err = new Error('Product not found.');
    err.status = 404;
    throw err;
  }
  assertOwnerOrAdmin(product, viewer);

  const image = await prisma.productImage.findFirst({ where: { id: imageId, productId } });
  if (!image) {
    const err = new Error('Image not found.');
    err.status = 404;
    throw err;
  }

  const updated = await prisma.productImage.update({
    where: { id: imageId },
    data: {
      ...(data.altText !== undefined ? { altText: data.altText } : {}),
      ...(data.displayOrder !== undefined ? { displayOrder: data.displayOrder } : {}),
    },
    include: { mediaAsset: true },
  });

  return { id: updated.id, altText: updated.altText, displayOrder: updated.displayOrder, url: resolveMediaUrl(updated.mediaAsset) };
}

export async function reorderProductImages(productId, viewer, order) {
  const product = await prisma.product.findUnique({ where: { id: productId }, include: { artisan: true } });
  if (!product) {
    const err = new Error('Product not found.');
    err.status = 404;
    throw err;
  }
  assertOwnerOrAdmin(product, viewer);

  await prisma.$transaction(
    order.map((imageId, index) => prisma.productImage.updateMany({ where: { id: imageId, productId }, data: { displayOrder: index } }))
  );

  const images = await prisma.productImage.findMany({ where: { productId }, include: { mediaAsset: true }, orderBy: { displayOrder: 'asc' } });
  return images.map((img) => ({ id: img.id, altText: img.altText, displayOrder: img.displayOrder, url: resolveMediaUrl(img.mediaAsset) }));
}

export async function deleteProductImage(productId, imageId, viewer) {
  const product = await prisma.product.findUnique({ where: { id: productId }, include: { artisan: true } });
  if (!product) {
    const err = new Error('Product not found.');
    err.status = 404;
    throw err;
  }
  assertOwnerOrAdmin(product, viewer);

  const image = await prisma.productImage.findFirst({ where: { id: imageId, productId }, include: { mediaAsset: true } });
  if (!image) {
    const err = new Error('Image not found.');
    err.status = 404;
    throw err;
  }

  await prisma.productImage.delete({ where: { id: imageId } });
  await prisma.mediaAsset.delete({ where: { id: image.mediaAssetId } });

  if (image.mediaAsset?.storageKey?.startsWith('craftguard/')) {
    await deleteImage(image.mediaAsset.storageKey);
  }

  return { deleted: true };
}