import { Link } from 'react-router-dom';
import useProductOffers from '../../hooks/useProductOffers.js';
import OfferStatusBadge from '../offers/OfferStatusBadge.jsx';
import OfferEventTimeline from '../offers/OfferEventTimeline.jsx';
import { formatINR } from '../../lib/format.js';

export default function OfferPanel({ slug, offerable }) {
  const { data, loading, error } = useProductOffers(slug);

  if (loading) {
    return <div className="border border-line rounded-xl p-5 mt-6 text-sm text-mute animate-pulse motion-reduce:animate-none">Loading offer activity…</div>;
  }
  if (error || !data || data.viewerType === 'owner' || data.viewerType === 'admin') return null;

  if (data.viewerType === 'guest' || data.viewerType === 'buyer') {
    return (
      <div className="border border-line rounded-xl p-5 mt-6">
        <p className="text-sm text-charcoal">
          {data.aggregate.count > 0
            ? `${data.aggregate.count} offer${data.aggregate.count === 1 ? '' : 's'} submitted so far · Highest offer ${formatINR(data.aggregate.highestAmount)}`
            : 'No offers yet — be the first to make one.'}
        </p>
        {data.viewerType === 'guest' && offerable && (
          <Link to="/login" className="text-sm text-terracotta hover:underline mt-2 inline-block">
            Login to make an offer →
          </Link>
        )}
      </div>
    );
  }

  if (data.viewerType === 'buyer_with_offer') {
    const offer = data.myOffer;
    return (
      <div className="border border-line rounded-xl p-5 mt-6">
        <div className="flex items-center justify-between mb-3 gap-3">
          <p className="eyebrow">Your Offer</p>
          <OfferStatusBadge status={offer.status} />
        </div>
        <p className="text-lg font-serif mb-1">{formatINR(offer.currentAmount)}</p>
        {offer.currentAmount !== offer.originalAmount && (
          <p className="text-xs text-mute mb-2">Originally offered {formatINR(offer.originalAmount)}</p>
        )}
        <p className="text-sm text-mute mb-2">
          {data.aggregate.count > 1
            ? `${data.aggregate.count} offers submitted in total · Highest offer ${formatINR(data.aggregate.highestAmount)}`
            : 'Yours is currently the only active offer.'}
        </p>
        <OfferEventTimeline events={offer.events} />
      </div>
    );
  }

  return null;
}