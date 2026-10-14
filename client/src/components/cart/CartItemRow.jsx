import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveImage from '../media/ResponsiveImage.jsx';
import { formatINR } from '../../lib/format.js';
import useCart from '../../hooks/useCart.js';
import useToast from '../../hooks/useToast.js';

export default function CartItemRow({ item }) {
  const { updateDraftAmount, removeFromCart } = useCart();
  const { showToast } = useToast();
  const inputId = useId();
  const [amount, setAmount] = useState(item.draftAmount ?? '');
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  const theme = item.product.craft === 'KASUTI' ? 'kasuti' : 'ilkal';
  const craftLabel = item.product.craft === 'KASUTI' ? 'Kasuti' : 'Ilkal';

  async function handleBlur() {
    const numeric = amount === '' ? null : Number(amount);
    if (numeric !== null && (Number.isNaN(numeric) || numeric <= 0)) {
      showToast('Enter an amount greater than zero, or leave it blank.', 'error');
      setAmount(item.draftAmount ?? '');
      return;
    }
    if (numeric === item.draftAmount) return;
    setSaving(true);
    try {
      await updateDraftAmount(item.id, numeric);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    setRemoving(true);
    try {
      await removeFromCart(item.id);
      showToast('Removed from your cart.');
    } catch (err) {
      showToast(err.message, 'error');
      setRemoving(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-5 border-b border-line py-6">
      <Link to={`/product/${item.product.slug}`} className="w-full sm:w-32 flex-shrink-0">
        <ResponsiveImage
          src={item.product.image?.url}
          alt={item.product.image?.altText || `${item.product.name} photograph`}
          theme={theme}
          label={item.product.image?.altText}
          aspect="4/5"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <p className="eyebrow mb-1">{craftLabel}</p>
        <Link to={`/product/${item.product.slug}`} className="font-serif text-lg hover:text-terracotta transition-colors">
          {item.product.name}
        </Link>
        {item.product.price && <p className="text-sm text-mute mt-1">Listed price: {formatINR(item.product.price)}</p>}
        {!item.product.offerable && (
          <p className="text-sm text-terracotta mt-1">This piece is {item.product.status.toLowerCase()} and is no longer open to offers.</p>
        )}

        <div className="mt-4 max-w-xs">
          <label htmlFor={inputId} className="block text-xs text-mute mb-2">Your intended offer amount (optional)</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-mute">₹</span>
            <input
              id={inputId}
              type="number"
              min="1"
              step="1"
              value={amount}
              disabled={!item.product.offerable}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={handleBlur}
              className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50"
              placeholder="e.g. 8000"
            />
            {saving && <span className="text-xs text-mute flex-shrink-0">Saving…</span>}
          </div>
        </div>
      </div>

      <button onClick={handleRemove} disabled={removing} className="text-sm text-terracotta hover:underline h-fit disabled:opacity-50">
        {removing ? 'Removing…' : 'Remove'}
      </button>
    </div>
  );
}