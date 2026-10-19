import { prisma } from './prisma.js';

export async function logAudit({ userId = null, action, entityType = null, entityId = null, metadata = null }) {
  try {
    await prisma.auditLog.create({ data: { userId, action, entityType, entityId, metadata } });
  } catch (err) {
    console.error('Audit log write failed:', err.message);
  }
}