import { prisma } from './prisma.js';

// Mirrors the non-throwing pattern used by logAudit() — notifications must
// never break the request they're attached to.
export async function createNotifications(items) {
  const valid = (items || []).filter((i) => i && i.userId);
  if (valid.length === 0) return;
  try {
    await prisma.notification.createMany({
      data: valid.map((i) => ({
        userId: i.userId,
        type: i.type,
        title: i.title,
        message: i.message,
        link: i.link || null,
        payload: i.payload || null,
      })),
    });
  } catch (err) {
    console.error('Failed to create notifications:', err);
  }
}