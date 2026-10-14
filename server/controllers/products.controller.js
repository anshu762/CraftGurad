import { listProducts, getProductBySlug, getFeaturedProducts } from '../services/products.service.js';

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
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await getProductBySlug(req.params.slug);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json({ product });
  } catch (err) {
    next(err);
  }
}

export async function getRelatedProducts(req, res, next) {
  try {
    const current = await getProductBySlug(req.params.slug);
    if (!current) return res.status(404).json({ error: 'Product not found.' });
    const result = await listProducts({ craft: current.craft, excludeSlug: req.params.slug, pageSize: 3 });
    res.json({ items: result.items });
  } catch (err) {
    next(err);
  }
}