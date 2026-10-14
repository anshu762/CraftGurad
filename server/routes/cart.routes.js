import { Router } from 'express';
import { authGuard } from '../middleware/authGuard.js';
import { get, add, updateDraft, remove, clear } from '../controllers/cart.controller.js';

const router = Router();
router.use(authGuard({ required: true }));

router.get('/', get);
router.post('/items', add);
router.patch('/items/:itemId', updateDraft);
router.delete('/items/:itemId', remove);
router.delete('/', clear);

export default router;