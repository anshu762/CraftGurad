import useAuth from '../hooks/useAuth.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useAdminOffers from '../hooks/useAdminOffers.js';
import OfferManagementPanel from '../components/offers/OfferManagementPanel.jsx';

export default function Admin() {
  useDocumentTitle('Admin', 'Manage CraftGuard users, products and offers.');
  const { user } = useAuth();
  const { items, loading, error, refresh } = useAdminOffers();

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <p className="eyebrow mb-4">Admin Dashboard</p>
      <h1 className="text-3xl md:text-4xl mb-10">Welcome, {user?.name}</h1>

      <p className="eyebrow mb-4">All Offers</p>
      {loading ? (
        <p className="text-mute">Loading offers…</p>
      ) : error ? (
        <p className="text-terracotta" role="alert">{error}</p>
      ) : items.length === 0 ? (
        <p className="text-mute">No offers have been submitted yet.</p>
      ) : (
        <OfferManagementPanel offers={items} onChange={refresh} />
      )}

      <p className="text-mute mt-16">Full user and product management tooling will be built in a future update.</p>
    </div>
  );
}