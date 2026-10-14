import { Router } from 'express';
import health from './health.routes.js';
import authRoutes from './auth.routes.js';
import productRoutes from './products.routes.js';
import cartRoutes from './cart.routes.js';

const router = Router();
router.use('/health', health);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);

// Phase 3+: router.use('/stories', storyRoutes);
// Phase 3+: router.use('/products', productRoutes);
// Phase 4: router.use('/offers', offerRoutes);
// Phase 4/5: router.use('/auth', authRoutes);

export default router;