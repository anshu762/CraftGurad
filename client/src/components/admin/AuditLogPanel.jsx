import useAdminAuditLogs from '../../hooks/useAdminAuditLogs.js';

export default function AuditLogPanel() {
  const { items, page, totalPages, loading, error, goToPage } = useAdminAuditLogs();

  return (
    <div>
      <p className="eyebrow mb-6">Audit Log</p>

      {loading ? <p className="text-mute">Loading audit log…</p>
      : error ? <p className="text-terracotta" role="alert">{error}</p>
      : items.length === 0 ? <p className="text-mute">No audit activity recorded yet.</p>
      : (
        <>
          <div className="space-y-3 mb-6">
            {items.map((log) => (
              <div key={log.id} className="border border-line rounded-sm p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">{log.action}</span>
                  <span className="text-xs text-mute">{new Date(log.createdAt).toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-mute mt-1">
                  {log.user ? `${log.user.name} (${log.user.role})` : 'System'}
                  {log.entityType && ` · ${log.entityType}${log.entityId ? ` #${log.entityId.slice(0, 8)}` : ''}`}
                </p>
                {log.metadata && (
                  <pre className="text-xs text-mute mt-2 bg-line/20 p-2 rounded-sm overflow-x-auto">{JSON.stringify(log.metadata, null, 2)}</pre>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button disabled={page <= 1} onClick={() => goToPage(page - 1)} className="text-sm text-terracotta hover:underline disabled:opacity-40 disabled:no-underline">
              ← Previous
            </button>
            <span className="text-xs text-mute">Page {page} of {totalPages}</span>
            <button disabled={page >= totalPages} onClick={() => goToPage(page + 1)} className="text-sm text-terracotta hover:underline disabled:opacity-40 disabled:no-underline">
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}