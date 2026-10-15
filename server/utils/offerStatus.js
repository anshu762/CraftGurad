export const ACTIVE_OFFER_STATUSES = ['PENDING', 'VIEWED', 'COUNTERED', 'ACCEPTED'];
export const OPEN_OFFER_STATUSES = ['PENDING', 'VIEWED', 'COUNTERED'];

export const OFFER_STATUS_LABELS = {
  PENDING: 'Pending review',
  VIEWED: 'Viewed by seller',
  COUNTERED: 'Countered',
  ACCEPTED: 'Accepted',
  REJECTED: 'Declined',
  WITHDRAWN: 'Withdrawn',
  EXPIRED: 'Expired',
  COMPLETED: 'Completed',
};

const TRANSITIONS = {
  ACCEPT: ['PENDING', 'VIEWED', 'COUNTERED'],
  REJECT: ['PENDING', 'VIEWED', 'COUNTERED'],
  COUNTER: ['PENDING', 'VIEWED'],
};

export function canTransition(fromStatus, action) {
  return (TRANSITIONS[action] || []).includes(fromStatus);
}