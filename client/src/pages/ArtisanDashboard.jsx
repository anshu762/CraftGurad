import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useMyProducts from '../hooks/useMyProducts.js';
import useProductOffers from '../hooks/useProductOffers.js';
import OfferManagementPanel from '../components/offers/OfferManagementPanel.jsx';
import ProductsPanel from '../components/artisan/ProductsPanel.jsx';
import ArtisanProfilePanel from '../components/artisan/ArtisanProfilePanel.jsx';
import { formatINR } from '../lib/format.js';

const TABS = [
  { key: 'products', label: 'My Products' },
  { key: 'offers', label: 'My Offers' },
  { key: 'profile', label: 'Profile' },
];

export default function ArtisanDashboard() {
  useDocumentTitle('Artisan Dashboard', 'Manage your products and offers.');
  const { user } = useAuth();
  const [tab, setTab] = useState('products');

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <p className="eyebrow mb-4">Artisan Dashboard</p>
      <h1 className="text-3xl md:text-4xl mb-10">Welcome, {user?.name}</h1>

      <div className="flex gap-2 mb-10 border-b border-line overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-3 text-sm uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors ${tab === t.key ? 'border-terracotta text-terracotta' : 'border-transparent text-mute hover:text-charcoal'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'products' && <ProductsPanel />}
      {tab === 'offers' && <OffersTab />}
      {tab === 'profile' && <ArtisanProfilePanel />}
    </div>
  );
}

function OffersTab() {
  const { items: products, loading, error, refresh: refreshProducts } = useMyProducts();
  const [selectedSlug, setSelectedSlug] = useState(null);
  const { data: offerData, loading: offersLoading, refresh: refreshOffers } = useProductOffers(selectedSlug);

  async function handleOfferChange() {
    await refreshOffers();
    await refreshProducts();
  }

  if (loading) return <p className="text-mute">Loading your products…</p>;
  if (error) return <p className="text-terracotta" role="alert">{error}</p>;
  if (products.length === 0) return <p className="text-mute">You don't have any products listed yet.</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-1 space-y-3">
        <p className="eyebrow mb-2">Your Products</p>
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedSlug(p.slug)}
            className={`w-full text-left border rounded-sm p-4 transition-colors ${selectedSlug === p.slug ? 'border-terracotta bg-terracotta/5' : 'border-line hover:border-charcoal'}`}
          >
            <p className="font-serif">{p.name}</p>
            <p className="text-xs text-mute mt-1">{p.status}</p>
            <p className="text-sm mt-2">
              {p.offerCount > 0 ? `${p.offerCount} offer${p.offerCount === 1 ? '' : 's'}${p.pendingCount > 0 ? ` · ${p.pendingCount} awaiting you` : ''}` : 'No offers yet'}
            </p>
            {p.highestActiveOffer != null && <p className="text-xs text-mute">Highest: {formatINR(p.highestActiveOffer)}</p>}
          </button>
        ))}
      </div>

      <div className="lg:col-span-2">
        {!selectedSlug ? (
          <p className="text-mute">Select a product to view and manage its offers.</p>
        ) : offersLoading ? (
          <p className="text-mute">Loading offers…</p>
        ) : (
          <>
            <p className="eyebrow mb-4">Offers on {offerData?.productName}</p>
            <OfferManagementPanel offers={offerData?.offers} onChange={handleOfferChange} />
          </>
        )}
      </div>
    </div>
  );
}