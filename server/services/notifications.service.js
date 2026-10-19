import { prisma } from '../utils/prisma.js';

export async function listNotifications(userId, { page = 1, pageSize = 20 } = {}) {
  const skip = (page - 1) * pageSize;
  const [items, total, unreadCount] = await Promise.all([
    prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, skip, take: pageSize }),
    prisma.notification.count({ where: { userId } }),
    prisma.notification.count({ where: { userId, read: false } }),
  ]);
  return { items, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)), unreadCount };
}

export async function getUnreadCount(userId) {
  const unreadCount = await prisma.notification.count({ where: { userId, read: false } });
  return { unreadCount };
}

export async function markRead(userId, notificationId) {
  const notification = await prisma.notification.findUnique({ where: { id: notificationId } });
  if (!notification || notification.userId !== userId) {
    const err = new Error('Notification not found.');
    err.status = 404;
    throw err;
  }
  if (notification.read) return notification;
  return prisma.notification.update({ where: { id: notificationId }, data: { read: true, readAt: new Date() } });
}

export async function markAllRead(userId) {
  await prisma.notification.updateMany({ where: { userId, read: false }, data: { read: true, readAt: new Date() } });
  return { success: true };
}