import {
  listProducts, getProductBySlug, getFeaturedProducts, getMyProducts as getMyProductsService,
  createProduct as createProductService, getProductForManage, updateProduct as updateProductService,
  archiveProduct as archiveProductService, addProductImage, updateProductImage, deleteProductImage, reorderProductImages,
} from '../services/products.service.js';
import { createProductSchema, updateProductSchema, updateImageSchema, reorderImagesSchema } from '../validation/products.validation.js';

export async function getProducts(req, res, next) {
  try {
    const { craft, availability, sort, page, pageSize, featured } = req.query;

    if (featured === 'true') {
      const items = await getFeaturedProducts(Number(pageSize) || 3);
      return res.json({ items, total: items.length, page: 1, pageSize: items.length, totalPages: 1 });
    }

    const result = await listProducts({
      craft, availability, sort,
      page: Number(page) || 1,
      pageSize: Math.min(Number(pageSize) || 12, 48),
    });
    res.json(result);
  } catch (err) { next(err); }
}

export async function getProduct(req, res, next) {
  try {
    const product = await getProductBySlug(req.params.slug);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json({ product });
  } catch (err) { next(err); }
}

export async function getRelatedProducts(req, res, next) {
  try {
    const current = await getProductBySlug(req.params.slug);
    if (!current) return res.status(404).json({ error: 'Product not found.' });
    const result = await listProducts({ craft: current.craft, excludeSlug: req.params.slug, pageSize: 3 });
    res.json({ items: result.items });
  } catch (err) { next(err); }
}

export async function getMyProducts(req, res, next) {
  try {
    const items = await getMyProductsService(req.user.sub);
    res.json({ items });
  } catch (err) { next(err); }
}

export async function createProduct(req, res, next) {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    const product = await createProductService(req.user.sub, parsed.data);
    res.status(201).json({ product });
  } catch (err) { next(err); }
}

export async function getProductManage(req, res, next) {
  try {
    const product = await getProductForManage(req.params.id, req.user);
    res.json({ product });
  } catch (err) { next(err); }
}

export async function updateProductCtrl(req, res, next) {
  try {
    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    const product = await updateProductService(req.params.id, req.user, parsed.data);
    res.json({ product });
  } catch (err) { next(err); }
}

export async function archiveProductCtrl(req, res, next) {
  try {
    const result = await archiveProductService(req.params.id, req.user);
    res.json(result);
  } catch (err) { next(err); }
}

export async function addImage(req, res, next) {
  try {
    const image = await addProductImage(req.params.id, req.user, req.file, req.body.altText);
    res.status(201).json({ image });
  } catch (err) { next(err); }
}

export async function updateImage(req, res, next) {
  try {
    const parsed = updateImageSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    const image = await updateProductImage(req.params.id, req.params.imageId, req.user, parsed.data);
    res.json({ image });
  } catch (err) { next(err); }
}

export async function deleteImageCtrl(req, res, next) {
  try {
    const result = await deleteProductImage(req.params.id, req.params.imageId, req.user);
    res.json(result);
  } catch (err) { next(err); }
}

export async function reorderImages(req, res, next) {
  try {
    const parsed = reorderImagesSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Validation failed', fieldErrors: parsed.error.flatten().fieldErrors });
    const images = await reorderProductImages(req.params.id, req.user, parsed.data.order);
    res.json({ images });
  } catch (err) { next(err); }
}