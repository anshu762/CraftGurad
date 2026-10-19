import { listNotifications, getUnreadCount, markRead, markAllRead } from '../services/notifications.service.js';

export async function list(req, res, next) {
  try {
    const { page, pageSize } = req.query;
    const result = await listNotifications(req.user.sub, { page: Number(page) || 1, pageSize: Math.min(Number(pageSize) || 20, 50) });
    res.json(result);
  } catch (err) { next(err); }
}

export async function unreadCount(req, res, next) {
  try {
    const result = await getUnreadCount(req.user.sub);
    res.json(result);
  } catch (err) { next(err); }
}

export async function readOne(req, res, next) {
  try {
    const notification = await markRead(req.user.sub, req.params.id);
    res.json({ notification });
  } catch (err) { next(err); }
}

export async function readAll(req, res, next) {
  try {
    const result = await markAllRead(req.user.sub);
    res.json(result);
  } catch (err) { next(err); }
}