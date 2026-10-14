import { prisma } from '../utils/prisma.js';
import { isPubliclyVisible, toAvailabilityLabel, isOfferable, PUBLIC_VISIBLE_STATUSES } from '../utils/productStatus.js';

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

function serializeProduct(product, { detail = false } = {}) {
  const images = [...product.images]
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((img) => ({
      id: img.id,
      altText: img.altText,
      displayOrder: img.displayOrder,
      url: img.mediaAsset?.uploadStatus === 'UPLOADED' ? `/media/${img.mediaAsset.storageKey}` : null,
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

export async function listProducts({ craft, availability, sort = 'featured', page = 1, pageSize = 12, excludeSlug }) {
  const where = { status: { in: PUBLIC_VISIBLE_STATUSES } };

  if (craft && ['KASUTI', 'ILKAL'].includes(craft.toUpperCase())) {
    where.craft = craft.toUpperCase();
  }
  if (availability && AVAILABILITY_STATUS_MAP[availability]) {
    where.status = { in: AVAILABILITY_STATUS_MAP[availability] };
  }
  if (excludeSlug) {
    where.slug = { not: excludeSlug };
  }

  const orderBy = SORT_MAP[sort] || SORT_MAP.featured;
  const skip = (page - 1) * pageSize;

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
      include: { images: { include: { mediaAsset: true } }, artisan: true },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    items: items.map((p) => serializeProduct(p)),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getProductBySlug(slug) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: { include: { mediaAsset: true } }, artisan: true },
  });
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