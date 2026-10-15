import { prisma } from '../utils/prisma.js';
import { isOfferable, toAvailabilityLabel } from '../utils/productStatus.js';
import { resolveMediaUrl } from '../utils/media.js';

async function getOrCreateCart(userId) {
  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) cart = await prisma.cart.create({ data: { userId } });
  return cart;
}

function serializeCartItem(item) {
  const product = item.product;
  const image = product.images?.[0];
  return {
    id: item.id,
    draftAmount: item.draftAmount ? Number(item.draftAmount) : null,
    note: item.note,
    addedAt: item.createdAt,
    product: {
      id: product.id,
      name: product.name,
      slug: product.slug,
      craft: product.craft,
      price: product.price ? Number(product.price) : null,
      currency: product.currency,
      status: toAvailabilityLabel(product.status),
      offerable: isOfferable(product.status),
      image: image ? { url: resolveMediaUrl(image.mediaAsset), altText: image.altText } : null,
    },
  };
}

export async function getCart(userId) {
  const cart = await getOrCreateCart(userId);
  const items = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: { include: { images: { include: { mediaAsset: true } } } } },
    orderBy: { createdAt: 'desc' },
  });
  return { id: cart.id, items: items.map(serializeCartItem) };
}

export async function addItem(userId, productId) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    const err = new Error('Product not found.');
    err.status = 404;
    throw err;
  }
  if (!isOfferable(product.status)) {
    const err = new Error('This product is no longer open to offers.');
    err.status = 400;
    throw err;
  }

  const cart = await getOrCreateCart(userId);
  const existing = await prisma.cartItem.findUnique({ where: { cartId_productId: { cartId: cart.id, productId } } });
  if (existing) {
    const err = new Error('This item is already in your cart.');
    err.status = 409;
    throw err;
  }

  await prisma.cartItem.create({ data: { cartId: cart.id, productId } });
  return getCart(userId);
}

export async function updateItemDraftAmount(userId, itemId, draftAmount) {
  const cart = await getOrCreateCart(userId);
  const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } });
  if (!item) {
    const err = new Error('Cart item not found.');
    err.status = 404;
    throw err;
  }
  await prisma.cartItem.update({ where: { id: itemId }, data: { draftAmount } });
  return getCart(userId);
}

export async function removeItem(userId, itemId) {
  const cart = await getOrCreateCart(userId);
  const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } });
  if (!item) {
    const err = new Error('Cart item not found.');
    err.status = 404;
    throw err;
  }
  await prisma.cartItem.delete({ where: { id: itemId } });
  return getCart(userId);
}

export async function clearCart(userId) {
  const cart = await getOrCreateCart(userId);
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  return getCart(userId);
}