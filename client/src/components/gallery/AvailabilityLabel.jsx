const STYLES = {
  Available: 'text-indigo',
  'Offer under review': 'text-terracotta',
  Reserved: 'text-terracotta',
  Sold: 'text-mute',
  Archived: 'text-mute',
};

export default function AvailabilityLabel({ status }) {
  return <span className={`text-xs uppercase tracking-wide font-medium ${STYLES[status] || 'text-mute'}`}>{status}</span>;
}