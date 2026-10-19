import { prisma } from '../utils/prisma.js';
import { toAvailabilityLabel } from '../utils/productStatus.js';
import { resolveMediaUrl } from '../utils/media.js';
import { logAudit } from '../utils/audit.js';

const ROLES = ['PUBLIC_VISITOR', 'BUYER', 'ARTISAN', 'EDITOR', 'ADMIN', 'SUPER_ADMIN'];

// ---------- users ----------

export async function getAllUsers({ page = 1, pageSize = 20, role }) {
  const where = ROLES.includes(role) ? { role } : {};
  const skip = (page - 1) * pageSize;
  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where, skip, take: pageSize, orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, phone: true, role: true, isActive: true, createdAt: true },
    }),
    prisma.user.count({ where }),
  ]);
  return { items, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}

export async function updateUser(targetUserId, actionedBy, data) {
  const target = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!target) {
    const err = new Error('User not found.');
    err.status = 404;
    throw err;
  }
  if (target.id === actionedBy.sub && (data.isActive === false || data.role)) {
    const err = new Error('You cannot change your own role or deactivate your own account.');
    err.status = 400;
    throw err;
  }
  const updated = await prisma.user.update({ where: { id: targetUserId }, data });
  await logAudit({
    userId: actionedBy.sub, action: 'USER_UPDATED', entityType: 'User', entityId: targetUserId,
    metadata: { changes: data, targetEmail: target.email },
  });
  return { id: updated.id, name: updated.name, email: updated.email, role: updated.role, isActive: updated.isActive };
}

// ---------- products (admin: all statuses) ----------

export async function getAllProductsAdmin({ page = 1, pageSize = 20, status, craft }) {
  const where = {};
  if (status) where.status = status;
  if (craft && ['KASUTI', 'ILKAL'].includes(craft.toUpperCase())) where.craft = craft.toUpperCase();
  const skip = (page - 1) * pageSize;

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where, skip, take: pageSize, orderBy: { createdAt: 'desc' },
      include: { images: { include: { mediaAsset: true } }, artisan: { include: { user: true } } },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    items: items.map((p) => {
      const image = [...p.images].sort((a, b) => a.displayOrder - b.displayOrder)[0];
      return {
        id: p.id, name: p.name, slug: p.slug, craft: p.craft,
        price: p.price ? Number(p.price) : null,
        status: p.status, statusLabel: toAvailabilityLabel(p.status), published: p.published,
        image: image ? { url: resolveMediaUrl(image.mediaAsset), altText: image.altText } : null,
        artisan: p.artisan ? { name: p.artisan.publicDisplayName || p.artisan.user?.name, email: p.artisan.user?.email } : null,
        createdAt: p.createdAt,
      };
    }),
    total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

// ---------- stats ----------

export async function getStats() {
  const [
    usersByRole, productsByStatus, offersByStatus, acceptedAgg, totalUsers, totalProducts, totalOffers,
    totalArtisans, pendingConsentCount, totalConsentRecords,
  ] = await Promise.all([
    prisma.user.groupBy({ by: ['role'], _count: true }),
    prisma.product.groupBy({ by: ['status'], _count: true }),
    prisma.offer.groupBy({ by: ['status'], _count: true }),
    prisma.offer.aggregate({ where: { status: 'ACCEPTED' }, _sum: { currentAmount: true } }),
    prisma.user.count(),
    prisma.product.count(),
    prisma.offer.count(),
    prisma.artisanProfile.count(),
    prisma.consentRecord.count({ where: { status: 'PENDING' } }),
    prisma.consentRecord.count(),
  ]);

  return {
    totals: { users: totalUsers, products: totalProducts, offers: totalOffers, artisans: totalArtisans },
    usersByRole: Object.fromEntries(usersByRole.map((r) => [r.role, r._count])),
    productsByStatus: Object.fromEntries(productsByStatus.map((r) => [r.status, r._count])),
    offersByStatus: Object.fromEntries(offersByStatus.map((r) => [r.status, r._count])),
    acceptedOffersValue: acceptedAgg._sum.currentAmount ? Number(acceptedAgg._sum.currentAmount) : 0,
    consent: { pending: pendingConsentCount, total: totalConsentRecords },
  };
}

// ---------- audit logs ----------

export async function getAuditLogs({ page = 1, pageSize = 30, action, entityType }) {
  const where = {};
  if (action) where.action = { contains: action, mode: 'insensitive' };
  if (entityType) where.entityType = entityType;
  const skip = (page - 1) * pageSize;

  const [items, total] = await Promise.all([
    prisma.auditLog.findMany({
      where, skip, take: pageSize, orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true, role: true } } },
    }),
    prisma.auditLog.count({ where }),
  ]);

  return {
    items: items.map((log) => ({
      id: log.id, action: log.action, entityType: log.entityType, entityId: log.entityId,
      metadata: log.metadata, createdAt: log.createdAt,
      user: log.user ? { name: log.user.name, email: log.user.email, role: log.user.role } : null,
    })),
    total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

// ---------- site settings ----------

export async function getSettings() {
  return prisma.siteSetting.findMany({ orderBy: { key: 'asc' } });
}

export async function upsertSetting(key, value, actionedBy) {
  const setting = await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  await logAudit({ userId: actionedBy.sub, action: 'SETTING_UPDATED', entityType: 'SiteSetting', entityId: setting.id, metadata: { key, value } });
  return setting;
}