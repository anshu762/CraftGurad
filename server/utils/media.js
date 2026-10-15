import { buildImageUrl } from '../services/storage.service.js';

/**
 * Resolves a MediaAsset into a displayable URL.
 * - Already-absolute URLs (legacy/seeded) pass through unchanged.
 * - New Cloudinary uploads are prefixed "craftguard/" and resolved via the Cloudinary CDN.
 * - Anything else falls back to the original /media/:key placeholder behaviour (unchanged).
 */
export function resolveMediaUrl(mediaAsset) {
  if (!mediaAsset || mediaAsset.uploadStatus !== 'UPLOADED' || !mediaAsset.storageKey) return null;
  const key = mediaAsset.storageKey;
  if (key.startsWith('http://') || key.startsWith('https://')) return key;
  if (key.startsWith('craftguard/')) return buildImageUrl(key);
  return `/media/${key}`;
}