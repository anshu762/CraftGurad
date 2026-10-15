import { useState } from 'react';
import useArtisanProfile from '../../hooks/useArtisanProfile.js';
import { apiClient } from '../../lib/apiClient.js';
import useToast from '../../hooks/useToast.js';

const CONSENT_TYPES = [
  { key: 'PORTRAIT', label: 'Portrait photo usage' },
  { key: 'QUOTE', label: 'Quote usage' },
  { key: 'NAME', label: 'Name usage' },
  { key: 'LOCATION', label: 'Location usage' },
  { key: 'PRODUCT_ATTRIBUTION', label: 'Product attribution' },
];

const CONSENT_STYLES = {
  PENDING: 'bg-amber-100 text-amber-800', GRANTED: 'bg-green-100 text-green-800',
  DENIED: 'bg-red-100 text-red-700', REVOKED: 'bg-gray-100 text-gray-700',
};

export default function ArtisanProfilePanel() {
  const { profile, loading, error, refresh } = useArtisanProfile();
  const { showToast } = useToast();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [portraitFile, setPortraitFile] = useState(null);
  const [uploadingPortrait, setUploadingPortrait] = useState(false);

  if (loading) return <p className="text-mute">Loading your profile…</p>;
  if (error) return <p className="text-terracotta" role="alert">{error}</p>;
  if (!profile) return null;

  const current = form || { publicDisplayName: profile.publicDisplayName || '', location: profile.location || '', biography: profile.biography || '', craftAssociation: profile.craftAssociation || '' };

  function update(key, value) { setForm({ ...current, [key]: value }); }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.patch('/artisans/me', { ...current, craftAssociation: current.craftAssociation || null });
      showToast('Profile updated.');
      setForm(null);
      await refresh();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handlePortraitUpload(e) {
    e.preventDefault();
    if (!portraitFile) { showToast('Choose a photo first.', 'error'); return; }
    setUploadingPortrait(true);
    try {
      const formData = new FormData();
      formData.append('portrait', portraitFile);
      await apiClient.upload('/artisans/me/portrait', formData);
      setPortraitFile(null);
      showToast('Portrait uploaded — it is now pending consent review.');
      await refresh();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setUploadingPortrait(false);
    }
  }

  async function handleRequestConsent(consentType) {
    try {
      await apiClient.post('/artisans/me/consent-requests', { consentType });
      showToast('Consent request sent for review.');
      await refresh();
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  const latestByType = {};
  for (const record of profile.consentRecords) {
    if (!latestByType[record.consentType]) latestByType[record.consentType] = record;
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow mb-4">Editable Details</p>
        <form onSubmit={handleSave} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs text-mute mb-1">Public display name</label>
            <input value={current.publicDisplayName} onChange={(e) => update('publicDisplayName', e.target.value)}
              className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta" />
          </div>
          <div>
            <label className="block text-xs text-mute mb-1">Location</label>
            <input value={current.location} onChange={(e) => update('location', e.target.value)}
              className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta" />
          </div>
          <div>
            <label className="block text-xs text-mute mb-1">Biography</label>
            <textarea rows={4} value={current.biography} onChange={(e) => update('biography', e.target.value)}
              className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta" />
          </div>
          <div>
            <label className="block text-xs text-mute mb-1">Craft association</label>
            <select value={current.craftAssociation} onChange={(e) => update('craftAssociation', e.target.value)}
              className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta">
              <option value="">None</option>
              <option value="KASUTI">Kasuti</option>
              <option value="ILKAL">Ilkal</option>
            </select>
          </div>
          <button type="submit" disabled={saving} className="bg-charcoal text-cream px-5 py-3 text-sm uppercase tracking-wide hover:bg-terracotta transition-colors rounded-sm disabled:opacity-60">
            {saving ? 'Saving…' : 'Save Profile'}
          </button>
        </form>
      </div>

      <div>
        <p className="eyebrow mb-4">Portrait</p>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-line/30 flex-shrink-0">
            {profile.portrait?.url ? <img src={profile.portrait.url} alt={profile.portrait.altText} className="w-full h-full object-cover" /> : null}
          </div>
          <form onSubmit={handlePortraitUpload} className="flex-1 space-y-2">
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setPortraitFile(e.target.files?.[0] || null)} className="text-sm block" />
            <button type="submit" disabled={uploadingPortrait} className="border border-charcoal px-4 py-2 text-xs uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-sm disabled:opacity-60">
              {uploadingPortrait ? 'Uploading…' : 'Upload Portrait'}
            </button>
          </form>
        </div>
      </div>

      <div>
        <p className="eyebrow mb-4">Visibility &amp; Consent</p>
        <p className="text-sm text-mute mb-4">
          Your profile visibility and contact visibility are reviewed and managed by CraftGuard's editorial team to protect your identity and story. You can request consent review for each category below.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm">
          <div className="border border-line rounded-sm p-3">
            <span className="text-mute">Profile visible publicly:</span> {profile.profileVisibility ? 'Yes' : 'Not yet'}
          </div>
          <div className="border border-line rounded-sm p-3">
            <span className="text-mute">Contact details visible:</span> {profile.contactVisibility ? 'Yes' : 'Not yet'}
          </div>
        </div>

        <div className="space-y-3">
          {CONSENT_TYPES.map(({ key, label }) => {
            const record = latestByType[key];
            return (
              <div key={key} className="flex items-center justify-between border border-line rounded-sm p-3">
                <span className="text-sm">{label}</span>
                {record ? (
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${CONSENT_STYLES[record.status] || 'bg-gray-100 text-gray-700'}`}>
                    {record.status}
                  </span>
                ) : (
                  <button onClick={() => handleRequestConsent(key)} className="text-xs text-terracotta hover:underline">
                    Request Consent
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}