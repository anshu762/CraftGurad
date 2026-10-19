import { Router } from 'express';
import { authGuard } from '../middleware/authGuard.js';
import { list, unreadCount, readOne, readAll } from '../controllers/notifications.controller.js';

const router = Router();
router.use(authGuard({ required: true }));

router.get('/', list);
router.get('/unread-count', unreadCount);
router.patch('/read-all', readAll);
router.patch('/:id/read', readOne);

export default router;