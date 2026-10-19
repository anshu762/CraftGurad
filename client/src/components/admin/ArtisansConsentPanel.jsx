import { useState } from 'react';
import useAdminArtisans from '../../hooks/useAdminArtisans.js';
import useAdminConsentRecords from '../../hooks/useAdminConsentRecords.js';
import { apiClient } from '../../lib/apiClient.js';
import useToast from '../../hooks/useToast.js';

const CONSENT_STATUSES = ['PENDING', 'GRANTED', 'DENIED', 'REVOKED'];

export default function ArtisansConsentPanel() {
  const [artisanFilter, setArtisanFilter] = useState('all');
  const { items: artisans, loading: artisansLoading, error: artisansError, refresh: refreshArtisans } = useAdminArtisans(artisanFilter);
  const [recordFilter, setRecordFilter] = useState('PENDING');
  const { items: records, loading: recordsLoading, error: recordsError, refresh: refreshRecords } = useAdminConsentRecords(recordFilter);
  const { showToast } = useToast();
  const [busyId, setBusyId] = useState(null);

  async function handleVisibilityUpdate(artisanId, field, value) {
    setBusyId(artisanId);
    try { await apiClient.patch(`/admin/artisans/${artisanId}`, { [field]: value }); showToast('Updated.'); await refreshArtisans(); }
    catch (err) { showToast(err.message, 'error'); }
    finally { setBusyId(null); }
  }

  async function handleConsentStatusChange(artisanId, consentStatus) {
    setBusyId(artisanId);
    try { await apiClient.patch(`/admin/artisans/${artisanId}`, { consentStatus }); showToast('Consent status updated.'); await refreshArtisans(); }
    catch (err) { showToast(err.message, 'error'); }
    finally { setBusyId(null); }
  }

  async function handleRecordAction(recordId, action) {
    setBusyId(recordId);
    try { await apiClient.patch(`/admin/consent-records/${recordId}`, { action }); showToast('Consent record updated.'); await refreshRecords(); }
    catch (err) { showToast(err.message, 'error'); }
    finally { setBusyId(null); }
  }

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="eyebrow">Artisan Visibility &amp; Consent Status</p>
          <select value={artisanFilter} onChange={(e) => setArtisanFilter(e.target.value)}
            className="border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta">
            <option value="all">All</option>
            {CONSENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {artisansLoading ? <p className="text-mute">Loading artisans…</p>
        : artisansError ? <p className="text-terracotta" role="alert">{artisansError}</p>
        : artisans.length === 0 ? <p className="text-mute">No artisan profiles found.</p>
        : (
          <div className="space-y-4">
            {artisans.map((a) => (
              <div key={a.id} className="border border-line rounded-sm p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <p className="font-serif">{a.name || 'Unnamed artisan'}</p>
                    <p className="text-xs text-mute">{a.email}</p>
                  </div>
                  <select value={a.consentStatus} disabled={busyId === a.id} onChange={(e) => handleConsentStatusChange(a.id, e.target.value)}
                    className="border border-line px-2 py-1 text-xs rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50">
                    {CONSENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={a.profileVisibility} disabled={busyId === a.id} onChange={(e) => handleVisibilityUpdate(a.id, 'profileVisibility', e.target.checked)} />
                    Profile visible publicly
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={a.contactVisibility} disabled={busyId === a.id} onChange={(e) => handleVisibilityUpdate(a.id, 'contactVisibility', e.target.checked)} />
                    Contact visible
                  </label>
                  {a.pendingConsentCount > 0 && <span className="text-xs text-terracotta">{a.pendingConsentCount} pending request(s)</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="eyebrow">Consent Requests</p>
          <select value={recordFilter} onChange={(e) => setRecordFilter(e.target.value)}
            className="border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta">
            <option value="all">All</option>
            {CONSENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {recordsLoading ? <p className="text-mute">Loading consent records…</p>
        : recordsError ? <p className="text-terracotta" role="alert">{recordsError}</p>
        : records.length === 0 ? <p className="text-mute">No consent records found.</p>
        : (
          <div className="space-y-4">
            {records.map((r) => (
              <div key={r.id} className="border border-line rounded-sm p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div>
                    <p className="font-serif">{r.artisan.name}</p>
                    <p className="text-xs text-mute">{r.consentType} · {r.status}</p>
                  </div>
                  {r.mediaUrl && <img src={r.mediaUrl} alt="" className="w-16 h-16 object-cover rounded-sm" />}
                </div>
                {r.status === 'PENDING' && (
                  <div className="flex gap-2 mt-3">
                    <button disabled={busyId === r.id} onClick={() => handleRecordAction(r.id, 'GRANT')} className="border border-charcoal px-3 py-1.5 text-xs uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-sm disabled:opacity-50">
                      Grant
                    </button>
                    <button disabled={busyId === r.id} onClick={() => handleRecordAction(r.id, 'DENY')} className="border border-terracotta text-terracotta px-3 py-1.5 text-xs uppercase tracking-wide hover:bg-terracotta hover:text-cream transition-colors rounded-sm disabled:opacity-50">
                      Deny
                    </button>
                  </div>
                )}
                {r.status === 'GRANTED' && (
                  <button disabled={busyId === r.id} onClick={() => handleRecordAction(r.id, 'REVOKE')} className="text-xs text-terracotta hover:underline mt-2">
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}