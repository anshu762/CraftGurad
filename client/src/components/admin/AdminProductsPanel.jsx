import { useState } from 'react';
import useAdminProducts from '../../hooks/useAdminProducts.js';
import { apiClient } from '../../lib/apiClient.js';
import { formatINR } from '../../lib/format.js';
import useToast from '../../hooks/useToast.js';

const STATUSES = ['DRAFT', 'PUBLISHED', 'AVAILABLE', 'OFFER_PENDING', 'OFFER_ACCEPTED', 'RESERVED', 'SOLD', 'ARCHIVED'];

export default function AdminProductsPanel() {
  const [statusFilter, setStatusFilter] = useState('all');
  const { items, loading, error, refresh } = useAdminProducts(statusFilter);
  const { showToast } = useToast();
  const [busyId, setBusyId] = useState(null);

  async function handleTogglePublish(p) {
    setBusyId(p.id);
    try {
      await apiClient.patch(`/products/manage/${p.id}`, { published: !p.published });
      showToast(p.published ? 'Unpublished.' : 'Published.');
      await refresh();
    } catch (err) { showToast(err.message, 'error'); }
    finally { setBusyId(null); }
  }

  async function handleArchive(p) {
    if (!window.confirm(`Archive "${p.name}"?`)) return;
    setBusyId(p.id);
    try { await apiClient.delete(`/products/manage/${p.id}`); showToast('Product archived.'); await refresh(); }
    catch (err) { showToast(err.message, 'error'); }
    finally { setBusyId(null); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="eyebrow">All Products</p>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta">
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? <p className="text-mute">Loading products…</p>
      : error ? <p className="text-terracotta" role="alert">{error}</p>
      : items.length === 0 ? <p className="text-mute">No products found.</p>
      : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => (
            <div key={p.id} className="border border-line rounded-sm p-4">
              <div className="aspect-[4/5] bg-line/30 mb-3 overflow-hidden rounded-sm">
                {p.image?.url ? <img src={p.image.url} alt={p.image.altText} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-mute">No photo</div>}
              </div>
              <p className="font-serif">{p.name}</p>
              <p className="text-xs text-mute mb-1">{p.statusLabel} {p.published ? '· Published' : '· Draft'}</p>
              {p.price && <p className="text-sm mb-2">{formatINR(p.price)}</p>}
              {p.artisan && <p className="text-xs text-mute mb-3">By {p.artisan.name} ({p.artisan.email})</p>}
              <div className="flex flex-wrap gap-2">
                <button disabled={busyId === p.id} onClick={() => handleTogglePublish(p)} className="border border-charcoal px-3 py-1.5 text-xs uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-sm disabled:opacity-50">
                  {p.published ? 'Unpublish' : 'Publish'}
                </button>
                {p.status !== 'ARCHIVED' && (
                  <button disabled={busyId === p.id} onClick={() => handleArchive(p)} className="border border-terracotta text-terracotta px-3 py-1.5 text-xs uppercase tracking-wide hover:bg-terracotta hover:text-cream transition-colors rounded-sm disabled:opacity-50">
                    Archive
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}