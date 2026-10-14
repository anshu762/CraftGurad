import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Account() {
  useDocumentTitle('My Account', 'Manage your CraftGuard account.');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/', { replace: true });
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <p className="eyebrow mb-4">My Account</p>
      <h1 className="text-3xl md:text-4xl mb-8">Welcome, {user.name}</h1>
      <div className="border border-line rounded-sm p-6 mb-8 space-y-3">
        <p><span className="text-mute">Email:</span> {user.email}</p>
        {user.phone && <p><span className="text-mute">Phone:</span> {user.phone}</p>}
        <p><span className="text-mute">Role:</span> {user.role}</p>
      </div>
      <Link to="/cart" className="inline-block mb-6 text-sm uppercase tracking-wide border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors">
        View My Cart →
      </Link>
      <p className="text-sm text-mute mb-6">Offer submission and tracking will be available in the next update.</p>
      <button onClick={handleLogout} className="border border-charcoal px-6 py-3 text-sm uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors">
        Log Out
      </button>
    </div>
  );
}