import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import useToast from '../hooks/useToast.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import Breadcrumbs from '../components/navigation/Breadcrumbs.jsx';
import CartItemRow from '../components/cart/CartItemRow.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';
import EmptyState from '../components/gallery/EmptyState.jsx';
import PageLoader from '../components/layout/PageLoader.jsx';

export default function Cart() {
  useDocumentTitle('My Cart', 'Review the pieces you plan to make an offer on.');
  const { cart, loading } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleSubmit() {
    showToast('Offer submission will be available in the next update. Your selections are saved.');
  }

  if (loading) return <PageLoader />;

  return (
    <div className="px-5 md:px-8 py-12 md:py-20 max-w-6xl mx-auto">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'My Cart' }]} />

      <p className="eyebrow mb-3">Your Selections</p>
      <h1 className="text-3xl md:text-4xl mb-10">My Cart</h1>

      {cart.items.length === 0 ? (
        <EmptyState
          message="Your cart is empty. Browse the gallery to find pieces you'd like to make an offer on."
          actionLabel="Browse the Gallery"
          onAction={() => navigate('/gallery')}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {cart.items.map((item) => <CartItemRow key={item.id} item={item} />)}
          </div>
          <div>
            <CartSummary items={cart.items} onSubmit={handleSubmit} />
          </div>
        </div>
      )}

      <div className="text-center mt-16">
        <Link to="/gallery" className="text-sm uppercase tracking-wide border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors">
          ← Continue Browsing
        </Link>
      </div>
    </div>
  );
}