import { prisma } from '../utils/prisma.js';
import { resolveMediaUrl } from '../utils/media.js';
import { logAudit } from '../utils/audit.js';

function serializeArtisan(profile) {
  return {
    id: profile.id,
    userId: profile.userId,
    name: profile.publicDisplayName || profile.user?.name,
    email: profile.user?.email,
    location: profile.location,
    craftAssociation: profile.craftAssociation,
    portrait: profile.portraitAsset ? { url: resolveMediaUrl(profile.portraitAsset), altText: profile.portraitAsset.altText } : null,
    profileVisibility: profile.profileVisibility,
    contactVisibility: profile.contactVisibility,
    consentStatus: profile.consentStatus,
    pendingConsentCount: profile.consentRecords?.filter((c) => c.status === 'PENDING').length ?? 0,
    createdAt: profile.createdAt,
  };
}

export async function getAllArtisans({ page = 1, pageSize = 20, consentStatus }) {
  const where = ['PENDING', 'GRANTED', 'DENIED', 'REVOKED'].includes(consentStatus) ? { consentStatus } : {};
  const skip = (page - 1) * pageSize;

  const [items, total] = await Promise.all([
    prisma.artisanProfile.findMany({
      where, skip, take: pageSize, orderBy: { createdAt: 'desc' },
      include: { user: true, portraitAsset: true, consentRecords: true },
    }),
    prisma.artisanProfile.count({ where }),
  ]);

  return { items: items.map(serializeArtisan), total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}

export async function updateArtisanVisibility(artisanId, data, actionedBy) {
  const existing = await prisma.artisanProfile.findUnique({ where: { id: artisanId } });
  if (!existing) {
    const err = new Error('Artisan profile not found.');
    err.status = 404;
    throw err;
  }
  await prisma.artisanProfile.update({ where: { id: artisanId }, data });
  await logAudit({ userId: actionedBy.sub, action: 'ARTISAN_VISIBILITY_UPDATED', entityType: 'ArtisanProfile', entityId: artisanId, metadata: data });

  const updated = await prisma.artisanProfile.findUnique({
    where: { id: artisanId },
    include: { user: true, portraitAsset: true, consentRecords: true },
  });
  return serializeArtisan(updated);
}

export async function getConsentRecords({ page = 1, pageSize = 20, status }) {
  const where = ['PENDING', 'GRANTED', 'DENIED', 'REVOKED'].includes(status) ? { status } : {};
  const skip = (page - 1) * pageSize;

  const [items, total] = await Promise.all([
    prisma.consentRecord.findMany({
      where, skip, take: pageSize, orderBy: { createdAt: 'desc' },
      include: { artisan: { include: { user: true } }, mediaAsset: true },
    }),
    prisma.consentRecord.count({ where }),
  ]);

  return {
    items: items.map((c) => ({
      id: c.id, consentType: c.consentType, status: c.status, consentDate: c.consentDate,
      expiryDate: c.expiryDate, restrictions: c.restrictions, notes: c.notes, obtainedBy: c.obtainedBy,
      createdAt: c.createdAt, mediaUrl: c.mediaAsset ? resolveMediaUrl(c.mediaAsset) : null,
      artisan: { id: c.artisan.id, name: c.artisan.publicDisplayName || c.artisan.user?.name, email: c.artisan.user?.email },
    })),
    total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

const ACTION_TO_STATUS = { GRANT: 'GRANTED', DENY: 'DENIED', REVOKE: 'REVOKED' };

export async function actOnConsentRecord(recordId, actionedBy, data) {
  const record = await prisma.consentRecord.findUnique({ where: { id: recordId } });
  if (!record) {
    const err = new Error('Consent record not found.');
    err.status = 404;
    throw err;
  }

  const newStatus = ACTION_TO_STATUS[data.action];
  const updateData = {
    status: newStatus,
    notes: data.notes || record.notes,
    restrictions: data.restrictions || record.restrictions,
    obtainedBy: actionedBy.email,
  };
  if (newStatus === 'GRANTED') {
    updateData.consentDate = new Date();
    if (data.expiryDate) {
      const d = new Date(data.expiryDate);
      if (!isNaN(d.getTime())) updateData.expiryDate = d;
    }
  }

  const updated = await prisma.consentRecord.update({ where: { id: recordId }, data: updateData });
  await logAudit({
    userId: actionedBy.sub, action: `CONSENT_${data.action}`, entityType: 'ConsentRecord', entityId: recordId,
    metadata: { consentType: record.consentType, artisanId: record.artisanId },
  });
  return updated;
}