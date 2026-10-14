export const PUBLIC_VISIBLE_STATUSES = [
  'PUBLISHED', 'AVAILABLE', 'OFFER_PENDING', 'OFFER_ACCEPTED', 'RESERVED', 'SOLD', 'ARCHIVED',
];

const STATUS_LABELS = {
  DRAFT: 'Draft',
  PUBLISHED: 'Available',
  AVAILABLE: 'Available',
  OFFER_PENDING: 'Offer under review',
  OFFER_ACCEPTED: 'Reserved',
  RESERVED: 'Reserved',
  SOLD: 'Sold',
  ARCHIVED: 'Archived',
};

export function isPubliclyVisible(status) {
  return PUBLIC_VISIBLE_STATUSES.includes(status);
}

export function toAvailabilityLabel(status) {
  return STATUS_LABELS[status] || 'Unavailable';
}

export function isOfferable(status) {
  return ['PUBLISHED', 'AVAILABLE', 'OFFER_PENDING'].includes(status);
}