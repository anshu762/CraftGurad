import OfferStatusBadge from './OfferStatusBadge.jsx';
import { formatINR } from '../../lib/format.js';

export default function OfferEventTimeline({ events }) {
  if (!events || events.length === 0) return null;
  return (
    <ol className="space-y-4 mt-4">
      {events.map((e, idx) => (
        <li key={e.id || idx} className="flex items-start gap-3 text-sm">
          <OfferStatusBadge status={e.status} />
          <div className="flex-1 min-w-0">
            {e.amount != null && <p className="text-charcoal">{formatINR(e.amount)}</p>}
            {e.reason && <p className="text-mute">{e.reason}</p>}
            {e.actionedBy && <p className="text-xs text-mute">By {e.actionedBy.name} ({e.actionedBy.role})</p>}
            <p className="text-xs text-mute">{new Date(e.createdAt).toLocaleString('en-IN')}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}