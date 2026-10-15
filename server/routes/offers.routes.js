import { Router } from 'express';
import { authGuard } from '../middleware/authGuard.js';
import { submit, mine, action, events } from '../controllers/offers.controller.js';

const router = Router();
router.use(authGuard({ required: true }));

router.post('/submit', submit);
router.get('/mine', mine);
router.patch('/:id', action);
router.get('/:id/events', events);

export default router;