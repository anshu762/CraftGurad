import { Router } from 'express';
import {
  getProducts, getProduct, getRelatedProducts, getMyProducts,
  createProduct, getProductManage, updateProductCtrl, archiveProductCtrl,
  addImage, updateImage, deleteImageCtrl, reorderImages,
} from '../controllers/products.controller.js';
import { forProduct } from '../controllers/offers.controller.js';
import { authGuard } from '../middleware/authGuard.js';
import { requireRole } from '../middleware/requireRole.js';
import { uploadSingle } from '../middleware/upload.js';

const router = Router();

router.get('/', getProducts);
router.get('/mine', authGuard({ required: true }), requireRole('ARTISAN'), getMyProducts);
router.post('/', authGuard({ required: true }), requireRole('ARTISAN'), createProduct);

router.get('/manage/:id', authGuard({ required: true }), requireRole('ARTISAN', 'ADMIN', 'SUPER_ADMIN'), getProductManage);
router.patch('/manage/:id', authGuard({ required: true }), requireRole('ARTISAN', 'ADMIN', 'SUPER_ADMIN'), updateProductCtrl);
router.delete('/manage/:id', authGuard({ required: true }), requireRole('ARTISAN', 'ADMIN', 'SUPER_ADMIN'), archiveProductCtrl);

router.post('/manage/:id/images', authGuard({ required: true }), requireRole('ARTISAN', 'ADMIN', 'SUPER_ADMIN'), uploadSingle('image'), addImage);
router.patch('/manage/:id/images/reorder', authGuard({ required: true }), requireRole('ARTISAN', 'ADMIN', 'SUPER_ADMIN'), reorderImages);
router.patch('/manage/:id/images/:imageId', authGuard({ required: true }), requireRole('ARTISAN', 'ADMIN', 'SUPER_ADMIN'), updateImage);
router.delete('/manage/:id/images/:imageId', authGuard({ required: true }), requireRole('ARTISAN', 'ADMIN', 'SUPER_ADMIN'), deleteImageCtrl);

router.get('/:slug/related', getRelatedProducts);
router.get('/:slug/offers', authGuard({ required: false }), forProduct);
router.get('/:slug', getProduct);

export default router;