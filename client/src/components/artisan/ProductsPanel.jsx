import { useState } from 'react';
import useMyProducts from '../../hooks/useMyProducts.js';
import useProductManage from '../../hooks/useProductManage.js';
import ProductForm from './ProductForm.jsx';
import ProductImageManager from './ProductImageManager.jsx';
import { apiClient } from '../../lib/apiClient.js';
import { formatINR } from '../../lib/format.js';
import useToast from '../../hooks/useToast.js';

export default function ProductsPanel() {
  const { items, loading, error, refresh } = useMyProducts();
  const { showToast } = useToast();
  const [mode, setMode] = useState('list'); // 'list' | 'create' | 'edit'
  const [selectedId, setSelectedId] = useState(null);
  const { product, refresh: refreshSelected } = useProductManage(mode === 'edit' ? selectedId : null);

  function openCreate() { setMode('create'); setSelectedId(null); }
  function openEdit(id) { setSelectedId(id); setMode('edit'); }
  function closeForm() { setMode('list'); setSelectedId(null); refresh(); }

  async function handleCreated(created) {
    await refresh();
    setSelectedId(created.id);
    setMode('edit');
  }

  async function handleQuickToggle(p) {
    try {
      await apiClient.patch(`/products/manage/${p.id}`, { published: !p.published });
      showToast(p.published ? 'Unpublished.' : 'Published.');
      await refresh();
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  async function handleArchive(p) {
    if (!window.confirm(`Archive "${p.name}"? It will be removed from the gallery.`)) return;
    try {
      await apiClient.delete(`/products/manage/${p.id}`);
      showToast('Product archived.');
      await refresh();
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  if (mode === 'create') {
    return (
      <div>
        <p className="eyebrow mb-4">New Product</p>
        <ProductForm onSaved={handleCreated} onCancel={() => setMode('list')} />
      </div>
    );
  }

  if (mode === 'edit' && product) {
    return (
      <div>
        <button onClick={closeForm} className="text-sm text-terracotta hover:underline mb-6">← Back to my products</button>
        <p className="eyebrow mb-4">Edit Product</p>
        <ProductForm product={product} onSaved={() => { refreshSelected(); refresh(); }} onCancel={closeForm} />
        <ProductImageManager productId={product.id} images={product.images} onChange={refreshSelected} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="eyebrow">My Products</p>
        <button onClick={openCreate} className="bg-charcoal text-cream px-5 py-2 text-xs uppercase tracking-wide hover:bg-terracotta transition-colors rounded-xl">
          + New Product
        </button>
      </div>

      {loading ? (
        <p className="text-mute">Loading your products…</p>
      ) : error ? (
        <p className="text-terracotta" role="alert">{error}</p>
      ) : items.length === 0 ? (
        <p className="text-mute">You haven't listed anything yet. Create your first product above.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((p) => (
            <div key={p.id} className="border border-line rounded-xl p-4">
              <div className="aspect-[4/5] bg-line/30 mb-3 overflow-hidden rounded-xl">
                {p.image?.url ? <img src={p.image.url} alt={p.image.altText} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-mute">No photo yet</div>}
              </div>
              <p className="font-serif">{p.name}</p>
              <p className="text-xs text-mute mb-1">{p.status} {p.published ? '· Published' : '· Draft'}</p>
              {p.price && <p className="text-sm mb-2">{formatINR(p.price)}</p>}
              <p className="text-xs text-mute mb-3">
                {p.offerCount > 0 ? `${p.offerCount} offer${p.offerCount === 1 ? '' : 's'}${p.pendingCount > 0 ? ` · ${p.pendingCount} awaiting you` : ''}` : 'No offers yet'}
              </p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => openEdit(p.id)} className="border border-charcoal px-3 py-1.5 text-xs uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-xl">
                  Edit
                </button>
                {!['SOLD', 'ARCHIVED'].includes(p.rawStatus) && (
                  <button onClick={() => handleQuickToggle(p)} className="border border-charcoal px-3 py-1.5 text-xs uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-xl">
                    {p.published ? 'Unpublish' : 'Publish'}
                  </button>
                )}
                {p.rawStatus !== 'ARCHIVED' && (
                  <button onClick={() => handleArchive(p)} className="border border-terracotta text-terracotta px-3 py-1.5 text-xs uppercase tracking-wide hover:bg-terracotta hover:text-cream transition-colors rounded-xl">
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