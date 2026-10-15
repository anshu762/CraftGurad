import { Router } from 'express';
import health from './health.routes.js';
import authRoutes from './auth.routes.js';
import productRoutes from './products.routes.js';
import cartRoutes from './cart.routes.js';
import offerRoutes from './offers.routes.js';
import adminRoutes from './admin.routes.js';
import artisanRoutes from './artisans.routes.js';

const router = Router();
router.use('/health', health);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/offers', offerRoutes);
router.use('/admin', adminRoutes);
router.use('/artisans', artisanRoutes);

export default router;