import { Router } from 'express';
import health from './health.routes.js';

const router = Router();
router.use('/health', health);

// Phase 3+: router.use('/stories', storyRoutes);
// Phase 3+: router.use('/products', productRoutes);
// Phase 4: router.use('/offers', offerRoutes);
// Phase 4/5: router.use('/auth', authRoutes);

export default router;