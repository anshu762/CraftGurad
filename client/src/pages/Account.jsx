import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useMyOffers from '../hooks/useMyOffers.js';
import OfferStatusBadge from '../components/offers/OfferStatusBadge.jsx';
import { formatINR } from '../lib/format.js';

export default function Account() {
  useDocumentTitle('My Account', 'Manage your CraftGuard account.');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { items: offers, loading: offersLoading } = useMyOffers();

  async function handleLogout() {
    await logout();
    navigate('/', { replace: true });
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <p className="eyebrow mb-4">My Account</p>
      <h1 className="text-3xl md:text-4xl mb-8">Welcome, {user.name}</h1>
      <div className="border border-line rounded-xl p-6 mb-8 space-y-3">
        <p><span className="text-mute">Email:</span> {user.email}</p>
        {user.phone && <p><span className="text-mute">Phone:</span> {user.phone}</p>}
        <p><span className="text-mute">Role:</span> {user.role}</p>
      </div>
      <Link to="/cart" className="inline-block mb-10 text-sm uppercase tracking-wide border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors">
        View My Cart →
      </Link>

      <p className="eyebrow mb-4">My Offers</p>
      {offersLoading ? (
        <p className="text-sm text-mute mb-10">Loading your offers…</p>
      ) : offers.length === 0 ? (
        <p className="text-sm text-mute mb-10">You haven't made any offers yet. Browse the gallery to find a piece you love.</p>
      ) : (
        <div className="space-y-4 mb-10">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              to={`/product/${offer.product.slug}`}
              className="block border border-line rounded-xl p-4 hover:border-terracotta transition-colors"
            >
              <div className="flex items-center justify-between mb-2 gap-3">
                <span className="font-serif truncate">{offer.product.name}</span>
                <OfferStatusBadge status={offer.status} />
              </div>
              <p className="text-sm text-mute">
                {formatINR(offer.currentAmount)}
                {offer.currentAmount !== offer.originalAmount ? ` (originally ${formatINR(offer.originalAmount)})` : ''}
              </p>
            </Link>
          ))}
        </div>
      )}

      <button onClick={handleLogout} className="border border-charcoal rounded-xl px-6 py-3 text-sm uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors">
        Log Out
      </button>
    </div>
  );
}