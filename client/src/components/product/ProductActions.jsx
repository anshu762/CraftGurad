import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import useCart from '../../hooks/useCart.js';
import useToast from '../../hooks/useToast.js';

export default function ProductActions({ product }) {
  const { user } = useAuth();
  const { isInCart, addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const [adding, setAdding] = useState(false);

  if (!product.offerable) {
    return (
      <div className="border border-line rounded-sm px-5 py-4 text-sm text-mute">
        This piece is {product.status.toLowerCase()} and is no longer open to offers.
      </div>
    );
  }

  const alreadyInCart = user ? isInCart(product.id) : false;

  function goToLogin() {
    navigate('/login', { state: { from: location } });
  }

  async function handleAddToCart() {
    if (!user) return goToLogin();
    if (alreadyInCart) { navigate('/cart'); return; }
    setAdding(true);
    try {
      await addToCart(product.id);
      showToast('Added to your cart.');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setAdding(false);
    }
  }

  async function handleMakeOffer() {
    if (!user) return goToLogin();
    if (!alreadyInCart) {
      setAdding(true);
      try {
        await addToCart(product.id);
      } catch (err) {
        showToast(err.message, 'error');
        setAdding(false);
        return;
      }
      setAdding(false);
    }
    navigate('/cart');
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={handleAddToCart}
        disabled={adding}
        className="flex-1 border border-charcoal px-6 py-3 text-sm uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-sm disabled:opacity-60"
      >
        {alreadyInCart ? 'View in Cart ✓' : adding ? 'Adding…' : 'Add to Cart'}
      </button>
      <button
        onClick={handleMakeOffer}
        disabled={adding}
        className="flex-1 bg-charcoal text-cream px-6 py-3 text-sm uppercase tracking-wide hover:bg-terracotta transition-colors rounded-sm disabled:opacity-60"
      >
        Make an Offer
      </button>
    </div>
  );
}