import { useState } from 'react';
import { apiClient } from '../../lib/apiClient.js';

const FIELD_GROUPS = [
  { label: 'Material', key: 'material' }, { label: 'Technique', key: 'technique' },
  { label: 'Motif', key: 'motif' }, { label: 'Dimensions', key: 'dimensions' },
  { label: 'Colour', key: 'colour' }, { label: 'Approx. making time', key: 'makingTimeApprox' },
  { label: 'Origin', key: 'origin' },
];

function toFormState(product) {
  return {
    name: product?.name || '', craft: product?.craft || 'KASUTI',
    description: product?.description || '', story: product?.story || '',
    material: product?.material || '', technique: product?.technique || '',
    motif: product?.motif || '', dimensions: product?.dimensions || '',
    colour: product?.colour || '', makingTimeApprox: product?.makingTimeApprox || '',
    origin: product?.origin || '', price: product?.price ?? '', reservePrice: product?.reservePrice ?? '',
    provenance: product?.provenance || '', shippingInfo: product?.shippingInfo || '',
    makerVisible: product?.makerVisible ?? false, published: product?.published ?? false,
  };
}

export default function ProductForm({ product, onSaved, onCancel }) {
  const [form, setForm] = useState(toFormState(product));
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  function update(key, value) { setForm((f) => ({ ...f, [key]: value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(''); setFieldErrors({}); setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        reservePrice: form.reservePrice === '' ? null : Number(form.reservePrice),
      };
      const result = product
        ? await apiClient.patch(`/products/manage/${product.id}`, payload)
        : await apiClient.post('/products', payload);
      onSaved(result.product);
    } catch (err) {
      setFormError(err.message);
      setFieldErrors(err.fieldErrors || {});
    } finally {
      setSaving(false);
    }
  }

  const locked = product && ['SOLD', 'ARCHIVED'].includes(product.status);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formError && <p className="text-terracotta text-sm" role="alert">{formError}</p>}
      {locked && (
        <p className="text-sm text-mute border border-line rounded-sm p-3">
          This product is {product.status.toLowerCase()} — details are locked. You can still manage its published state below.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-mute mb-1">Product name</label>
          <input disabled={locked} value={form.name} onChange={(e) => update('name', e.target.value)} required
            className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-60" />
          {fieldErrors.name && <p className="text-terracotta text-xs mt-1">{fieldErrors.name[0]}</p>}
        </div>
        <div>
          <label className="block text-xs text-mute mb-1">Craft</label>
          <select disabled={locked} value={form.craft} onChange={(e) => update('craft', e.target.value)}
            className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-60">
            <option value="KASUTI">Kasuti</option>
            <option value="ILKAL">Ilkal</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-mute mb-1">Price (₹)</label>
          <input disabled={locked} type="number" min="1" value={form.price} onChange={(e) => update('price', e.target.value)} required
            className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-60" />
          {fieldErrors.price && <p className="text-terracotta text-xs mt-1">{fieldErrors.price[0]}</p>}
        </div>
        <div>
          <label className="block text-xs text-mute mb-1">Reserve price (optional, not shown to buyers)</label>
          <input disabled={locked} type="number" min="1" value={form.reservePrice} onChange={(e) => update('reservePrice', e.target.value)}
            className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-60" />
        </div>
      </div>

      <div>
        <label className="block text-xs text-mute mb-1">Description</label>
        <textarea disabled={locked} rows={3} value={form.description} onChange={(e) => update('description', e.target.value)}
          className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-60" />
      </div>

      <div>
        <label className="block text-xs text-mute mb-1">Story of this piece</label>
        <textarea disabled={locked} rows={3} value={form.story} onChange={(e) => update('story', e.target.value)}
          className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-60" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELD_GROUPS.map(({ label, key }) => (
          <div key={key}>
            <label className="block text-xs text-mute mb-1">{label}</label>
            <input disabled={locked} value={form[key]} onChange={(e) => update(key, e.target.value)}
              className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-60" />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs text-mute mb-1">Provenance</label>
        <textarea disabled={locked} rows={2} value={form.provenance} onChange={(e) => update('provenance', e.target.value)}
          className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-60" />
      </div>

      <div>
        <label className="block text-xs text-mute mb-1">Shipping info</label>
        <textarea disabled={locked} rows={2} value={form.shippingInfo} onChange={(e) => update('shippingInfo', e.target.value)}
          className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-60" />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input disabled={locked} type="checkbox" checked={form.makerVisible} onChange={(e) => update('makerVisible', e.target.checked)} />
        Show my name and location on this listing
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.published} onChange={(e) => update('published', e.target.checked)} />
        Published (visible to buyers)
      </label>
      {fieldErrors.published && <p className="text-terracotta text-xs">{fieldErrors.published[0]}</p>}

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="flex-1 border border-charcoal px-5 py-3 text-sm uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-sm">
            Cancel
          </button>
        )}
        <button type="submit" disabled={saving} className="flex-1 bg-charcoal text-cream px-5 py-3 text-sm uppercase tracking-wide hover:bg-terracotta transition-colors rounded-sm disabled:opacity-60">
          {saving ? 'Saving…' : product ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}