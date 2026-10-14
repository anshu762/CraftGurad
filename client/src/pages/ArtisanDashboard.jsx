import useAuth from '../hooks/useAuth.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function ArtisanDashboard() {
  useDocumentTitle('Artisan Dashboard', 'Manage your products and offers.');
  const { user } = useAuth();
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <p className="eyebrow mb-4">Artisan Dashboard</p>
      <h1 className="text-3xl md:text-4xl mb-6">Welcome, {user?.name}</h1>
      <p className="text-mute">Product management and incoming offers will be built in Phase 7.</p>
    </div>
  );
}