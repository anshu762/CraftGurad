const STYLES = {
  PENDING: 'bg-amber-100 text-amber-800',
  VIEWED: 'bg-blue-100 text-blue-800',
  COUNTERED: 'bg-purple-100 text-purple-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-700',
  WITHDRAWN: 'bg-gray-100 text-gray-700',
  EXPIRED: 'bg-gray-100 text-gray-500',
  COMPLETED: 'bg-emerald-100 text-emerald-800',
};

const LABELS = {
  PENDING: 'Pending review',
  VIEWED: 'Viewed by seller',
  COUNTERED: 'Countered',
  ACCEPTED: 'Accepted',
  REJECTED: 'Declined',
  WITHDRAWN: 'Withdrawn',
  EXPIRED: 'Expired',
  COMPLETED: 'Completed',
};

export default function OfferStatusBadge({ status }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide whitespace-nowrap ${STYLES[status] || 'bg-gray-100 text-gray-700'}`}>
      {LABELS[status] || status}
    </span>
  );
}