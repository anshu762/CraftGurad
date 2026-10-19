import { formatINR } from '../../lib/format.js';

export default function CartSummary({ items, onSubmit }) {
  const offerableItems = items.filter((i) => i.product.offerable);
  const totalListed = offerableItems.reduce((sum, i) => sum + (i.product.price || 0), 0);
  const readyCount = offerableItems.filter((i) => i.draftAmount).length;

  return (
    <div className="border border-line rounded-xl p-6 lg:sticky lg:top-24">
      <p className="eyebrow mb-4">Summary</p>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-mute">Items in cart</span>
        <span>{items.length}</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-mute">Total listed value</span>
        <span>{formatINR(totalListed)}</span>
      </div>
      <div className="flex justify-between text-sm mb-6">
        <span className="text-mute">Offer amounts entered</span>
        <span>{readyCount} / {offerableItems.length}</span>
      </div>
      <button
        onClick={onSubmit}
        disabled={offerableItems.length === 0}
        className="w-full bg-charcoal text-cream py-3 text-sm uppercase tracking-wide hover:bg-terracotta transition-colors disabled:opacity-50 rounded-xl"
      >
        Review &amp; Submit Offers
      </button>
      <p className="text-xs text-mute mt-3 text-center">
        Offer submission opens in the next update. Your cart and draft amounts are saved to your account.
      </p>
    </div>
  );
}