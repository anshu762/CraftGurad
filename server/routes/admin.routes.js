import { Router } from 'express';
import { authGuard } from '../middleware/authGuard.js';
import { requireRole } from '../middleware/requireRole.js';
import { adminList } from '../controllers/offers.controller.js';

const router = Router();
router.use(authGuard({ required: true }), requireRole('ADMIN', 'SUPER_ADMIN'));

router.get('/offers', adminList);

export default router;