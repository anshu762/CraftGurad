import { prisma } from '../utils/prisma.js';
import { resolveMediaUrl } from '../utils/media.js';
import { uploadImageBuffer, deleteImage } from './storage.service.js';
import { logAudit } from '../utils/audit.js';

export async function ensureArtisanProfile(userId) {
  let profile = await prisma.artisanProfile.findUnique({ where: { userId } });
  if (!profile) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    profile = await prisma.artisanProfile.create({ data: { userId, publicDisplayName: user?.name || null } });
  }
  return profile;
}

function serializeProfile(profile) {
  return {
    id: profile.id, publicDisplayName: profile.publicDisplayName, location: profile.location, biography: profile.biography,
    craftAssociation: profile.craftAssociation,
    portrait: profile.portraitAsset ? { url: resolveMediaUrl(profile.portraitAsset), altText: profile.portraitAsset.altText } : null,
    profileVisibility: profile.profileVisibility, contactVisibility: profile.contactVisibility, consentStatus: profile.consentStatus,
    consentRecords: (profile.consentRecords || []).map((c) => ({
      id: c.id, consentType: c.consentType, status: c.status, consentDate: c.consentDate, expiryDate: c.expiryDate, notes: c.notes, createdAt: c.createdAt,
    })),
    createdAt: profile.createdAt, updatedAt: profile.updatedAt,
  };
}

export async function getMyProfile(userId) {
  await ensureArtisanProfile(userId);
  const profile = await prisma.artisanProfile.findUnique({
    where: { userId }, include: { portraitAsset: true, consentRecords: { orderBy: { createdAt: 'desc' } } },
  });
  return serializeProfile(profile);
}

const EDITABLE_FIELDS = ['publicDisplayName', 'location', 'biography', 'craftAssociation'];

export async function updateMyProfile(userId, data) {
  await ensureArtisanProfile(userId);
  const updateData = {};
  for (const field of EDITABLE_FIELDS) {
    if (data[field] !== undefined) updateData[field] = data[field] === '' ? null : data[field];
  }
  await prisma.artisanProfile.update({ where: { userId }, data: updateData });
  return getMyProfile(userId);
}

export async function uploadMyPortrait(userId, file) {
  if (!file) {
    const err = new Error('An image file is required.');
    err.status = 400;
    throw err;
  }
  const profile = await ensureArtisanProfile(userId);
  const result = await uploadImageBuffer(file.buffer, 'craftguard/artisans');

  const mediaAsset = await prisma.mediaAsset.create({
    data: {
      originalFilename: file.originalname, storageKey: result.public_id, mimeType: file.mimetype,
      width: result.width, height: result.height, fileSize: file.size,
      altText: `Portrait of ${profile.publicDisplayName || 'the artisan'}`, consentRequired: true, uploadStatus: 'UPLOADED',
    },
  });

  if (profile.portraitAssetId && profile.portraitAssetId !== mediaAsset.id) {
    const oldAsset = await prisma.mediaAsset.findUnique({ where: { id: profile.portraitAssetId } });
    if (oldAsset?.storageKey?.startsWith('craftguard/')) await deleteImage(oldAsset.storageKey);
  }

  await prisma.artisanProfile.update({ where: { userId }, data: { portraitAssetId: mediaAsset.id } });

  const existingConsent = await prisma.consentRecord.findFirst({ where: { artisanId: profile.id, consentType: 'PORTRAIT', status: { in: ['PENDING', 'GRANTED'] } } });
  if (!existingConsent) {
    await prisma.consentRecord.create({ data: { artisanId: profile.id, mediaAssetId: mediaAsset.id, consentType: 'PORTRAIT', status: 'PENDING' } });
  }

  await logAudit({ userId, action: 'PORTRAIT_UPLOADED', entityType: 'ArtisanProfile', entityId: profile.id, metadata: { mediaAssetId: mediaAsset.id } });

  return getMyProfile(userId);
}

const VALID_CONSENT_TYPES = ['PORTRAIT', 'QUOTE', 'NAME', 'LOCATION', 'PRODUCT_ATTRIBUTION'];

export async function requestConsent(userId, consentType) {
  if (!VALID_CONSENT_TYPES.includes(consentType)) {
    const err = new Error('Invalid consent type.');
    err.status = 400;
    throw err;
  }
  const profile = await ensureArtisanProfile(userId);

  const existing = await prisma.consentRecord.findFirst({ where: { artisanId: profile.id, consentType, status: { in: ['PENDING', 'GRANTED'] } } });
  if (!existing) {
    await prisma.consentRecord.create({ data: { artisanId: profile.id, consentType, status: 'PENDING' } });
  }

  await logAudit({ userId, action: 'CONSENT_REQUESTED', entityType: 'ConsentRecord', entityId: profile.id, metadata: { consentType } });

  return getMyProfile(userId);
}