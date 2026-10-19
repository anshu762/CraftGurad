import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useAdminOffers from '../hooks/useAdminOffers.js';
import OfferManagementPanel from '../components/offers/OfferManagementPanel.jsx';
import StatsOverview from '../components/admin/StatsOverview.jsx';
import AdminProductsPanel from '../components/admin/AdminProductsPanel.jsx';
import ArtisansConsentPanel from '../components/admin/ArtisansConsentPanel.jsx';
import AuditLogPanel from '../components/admin/AuditLogPanel.jsx';
import SettingsPanel from '../components/admin/SettingsPanel.jsx';
import UsersPanel from '../components/admin/UsersPanel.jsx';

export default function Admin() {
  useDocumentTitle('Admin', 'Manage CraftGuard users, products and offers.');
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  const TABS = [
    { key: 'stats', label: 'Overview' },
    { key: 'offers', label: 'Offers' },
    { key: 'products', label: 'Products' },
    { key: 'consent', label: 'Artisans & Consent' },
    { key: 'audit', label: 'Audit Log' },
    ...(isSuperAdmin ? [{ key: 'users', label: 'Users' }, { key: 'settings', label: 'Settings' }] : []),
  ];

  const [tab, setTab] = useState('stats');

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <p className="eyebrow mb-4">Admin Dashboard</p>
      <h1 className="text-3xl md:text-4xl mb-10">Welcome, {user?.name}</h1>

      <div className="flex gap-2 mb-10 border-b border-line overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-3 text-sm uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors ${tab === t.key ? 'border-terracotta text-terracotta' : 'border-transparent text-mute hover:text-charcoal'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'stats' && <StatsOverview />}
      {tab === 'offers' && <OffersTab />}
      {tab === 'products' && <AdminProductsPanel />}
      {tab === 'consent' && <ArtisansConsentPanel />}
      {tab === 'audit' && <AuditLogPanel />}
      {tab === 'users' && isSuperAdmin && <UsersPanel />}
      {tab === 'settings' && isSuperAdmin && <SettingsPanel />}
    </div>
  );
}

function OffersTab() {
  const { items, loading, error, refresh } = useAdminOffers();
  if (loading) return <p className="text-mute">Loading offers…</p>;
  if (error) return <p className="text-terracotta" role="alert">{error}</p>;
  if (items.length === 0) return <p className="text-mute">No offers have been submitted yet.</p>;
  return <OfferManagementPanel offers={items} onChange={refresh} />;
}