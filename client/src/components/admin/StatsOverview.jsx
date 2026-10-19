import useAdminStats from '../../hooks/useAdminStats.js';
import { formatINR } from '../../lib/format.js';

function StatCard({ label, value }) {
  return (
    <div className="border border-line rounded-sm p-5">
      <p className="text-xs text-mute uppercase tracking-wide mb-2">{label}</p>
      <p className="text-2xl font-serif">{value}</p>
    </div>
  );
}

export default function StatsOverview() {
  const { stats, loading, error } = useAdminStats();

  if (loading) return <p className="text-mute">Loading statistics…</p>;
  if (error) return <p className="text-terracotta" role="alert">{error}</p>;
  if (!stats) return null;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Users" value={stats.totals.users} />
        <StatCard label="Products" value={stats.totals.products} />
        <StatCard label="Offers" value={stats.totals.offers} />
        <StatCard label="Artisans" value={stats.totals.artisans} />
      </div>

      <div>
        <p className="eyebrow mb-3">Accepted Offers Value</p>
        <p className="text-3xl font-serif text-terracotta">{formatINR(stats.acceptedOffersValue)}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <p className="eyebrow mb-3">Products by Status</p>
          <div className="space-y-2">
            {Object.entries(stats.productsByStatus).map(([status, count]) => (
              <div key={status} className="flex justify-between text-sm border-b border-line pb-2">
                <span className="text-mute">{status}</span><span>{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-3">Offers by Status</p>
          <div className="space-y-2">
            {Object.entries(stats.offersByStatus).map(([status, count]) => (
              <div key={status} className="flex justify-between text-sm border-b border-line pb-2">
                <span className="text-mute">{status}</span><span>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <p className="eyebrow mb-3">Users by Role</p>
          <div className="space-y-2">
            {Object.entries(stats.usersByRole).map(([role, count]) => (
              <div key={role} className="flex justify-between text-sm border-b border-line pb-2">
                <span className="text-mute">{role}</span><span>{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-3">Consent Records</p>
          <div className="flex justify-between text-sm border-b border-line pb-2">
            <span className="text-mute">Pending review</span><span>{stats.consent.pending}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-line pb-2 mt-2">
            <span className="text-mute">Total records</span><span>{stats.consent.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}