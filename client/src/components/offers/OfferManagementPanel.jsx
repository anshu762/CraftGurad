import { useState } from 'react';
import { apiClient } from '../../lib/apiClient.js';
import { formatINR } from '../../lib/format.js';
import useToast from '../../hooks/useToast.js';
import OfferStatusBadge from './OfferStatusBadge.jsx';
import OfferEventTimeline from './OfferEventTimeline.jsx';

const OPEN_STATUSES = ['PENDING', 'VIEWED', 'COUNTERED'];

export default function OfferManagementPanel({ offers, onChange }) {
  const { showToast } = useToast();
  const [expandedId, setExpandedId] = useState(null);
  const [counteringId, setCounteringId] = useState(null);
  const [counterAmount, setCounterAmount] = useState('');
  const [reason, setReason] = useState('');
  const [busyId, setBusyId] = useState(null);

  async function runAction(offerId, payload) {
    setBusyId(offerId);
    try {
      await apiClient.patch(`/offers/${offerId}`, payload);
      showToast('Offer updated.');
      setCounteringId(null);
      setCounterAmount('');
      setReason('');
      await onChange();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setBusyId(null);
    }
  }

  if (!offers || offers.length === 0) {
    return <p className="text-sm text-mute">No offers have been made on this piece yet.</p>;
  }

  return (
    <div className="space-y-4">
      {offers.map((offer) => {
        const isOpen = OPEN_STATUSES.includes(offer.status);
        const expanded = expandedId === offer.id;
        const isCountering = counteringId === offer.id;
        return (
          <div key={offer.id} className="border border-line rounded-sm p-5">
            {offer.product && <p className="text-xs text-mute mb-1">{offer.product.name}</p>}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div>
                <p className="font-serif text-lg">{offer.buyerName}</p>
                <p className="text-sm text-mute break-all">{offer.buyerEmail} · {offer.buyerPhone}</p>
              </div>
              <OfferStatusBadge status={offer.status} />
            </div>

            <p className="text-xl font-serif mb-1">{formatINR(offer.currentAmount)}</p>
            {offer.currentAmount !== offer.originalAmount && (
              <p className="text-xs text-mute mb-2">Originally offered {formatINR(offer.originalAmount)}</p>
            )}
            {offer.message && <p className="text-sm text-charcoal/80 mb-2 italic">&ldquo;{offer.message}&rdquo;</p>}
            {offer.shippingLocation && <p className="text-xs text-mute mb-1">Ships to: {offer.shippingLocation}</p>}
            {offer.preferredContact && <p className="text-xs text-mute mb-2">Prefers contact via: {offer.preferredContact}</p>}

            <button onClick={() => setExpandedId(expanded ? null : offer.id)} className="text-xs text-terracotta hover:underline mb-1">
              {expanded ? 'Hide history' : 'View history'}
            </button>
            {expanded && <OfferEventTimeline events={offer.events} />}

            {isOpen && (
              <div className="mt-4 pt-4 border-t border-line">
                {isCountering ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-mute mb-1">Counter amount (₹)</label>
                      <input
                        type="number" min="1" value={counterAmount}
                        onChange={(e) => setCounterAmount(e.target.value)}
                        className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-mute mb-1">Note to buyer (optional)</label>
                      <textarea
                        value={reason} onChange={(e) => setReason(e.target.value)} rows={2}
                        className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setCounteringId(null)} className="flex-1 border border-charcoal px-4 py-2 text-xs uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-sm">
                        Cancel
                      </button>
                      <button
                        disabled={busyId === offer.id || !counterAmount}
                        onClick={() => runAction(offer.id, { action: 'COUNTER', counterAmount: Number(counterAmount), reason })}
                        className="flex-1 bg-charcoal text-cream px-4 py-2 text-xs uppercase tracking-wide hover:bg-terracotta transition-colors rounded-sm disabled:opacity-60"
                      >
                        Send Counter
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <button
                      disabled={busyId === offer.id}
                      onClick={() => runAction(offer.id, { action: 'ACCEPT' })}
                      className="border border-charcoal px-4 py-2 text-xs uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-sm disabled:opacity-60"
                    >
                      Accept
                    </button>
                    <button
                      disabled={busyId === offer.id}
                      onClick={() => setCounteringId(offer.id)}
                      className="border border-charcoal px-4 py-2 text-xs uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-sm disabled:opacity-60"
                    >
                      Counter
                    </button>
                    <button
                      disabled={busyId === offer.id}
                      onClick={() => runAction(offer.id, { action: 'REJECT' })}
                      className="border border-terracotta text-terracotta px-4 py-2 text-xs uppercase tracking-wide hover:bg-terracotta hover:text-cream transition-colors rounded-sm disabled:opacity-60"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}