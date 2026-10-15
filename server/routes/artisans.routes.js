import { Router } from 'express';
import { authGuard } from '../middleware/authGuard.js';
import { requireRole } from '../middleware/requireRole.js';
import { uploadSingle } from '../middleware/upload.js';
import { me, updateMe, uploadPortrait, requestConsentCtrl } from '../controllers/artisans.controller.js';

const router = Router();
router.use(authGuard({ required: true }), requireRole('ARTISAN'));

router.get('/me', me);
router.patch('/me', updateMe);
router.post('/me/portrait', uploadSingle('portrait'), uploadPortrait);
router.post('/me/consent-requests', requestConsentCtrl);

export default router;