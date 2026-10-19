import { Router } from 'express';
import { authGuard } from '../middleware/authGuard.js';
import { requireRole } from '../middleware/requireRole.js';
import { adminList } from '../controllers/offers.controller.js';
import {
  usersList, userUpdate, productsList, stats, auditLogs, settingsList, settingUpsert,
  artisansList, artisanUpdate, consentRecordsList, consentRecordAction,
} from '../controllers/admin.controller.js';

const router = Router();
router.use(authGuard({ required: true }), requireRole('ADMIN', 'SUPER_ADMIN'));

router.get('/stats', stats);
router.get('/offers', adminList);
router.get('/products', productsList);

router.get('/artisans', artisansList);
router.patch('/artisans/:id', artisanUpdate);

router.get('/consent-records', consentRecordsList);
router.patch('/consent-records/:id', consentRecordAction);

router.get('/audit-logs', auditLogs);

router.get('/users', usersList);
router.patch('/users/:id', requireRole('SUPER_ADMIN'), userUpdate);

router.get('/settings', requireRole('SUPER_ADMIN'), settingsList);
router.put('/settings/:key', requireRole('SUPER_ADMIN'), settingUpsert);

export default router;