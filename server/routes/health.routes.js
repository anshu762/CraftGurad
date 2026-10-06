import { Router } from 'express';
const router = Router();

export default router;

router.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'craftguard-api', time: new Date().toISOString() });
});
