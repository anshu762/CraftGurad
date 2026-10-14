import { Router } from 'express';
import { getProducts, getProduct, getRelatedProducts } from '../controllers/products.controller.js';

const router = Router();
router.get('/', getProducts);
router.get('/:slug', getProduct);
router.get('/:slug/related', getRelatedProducts);

export default router;