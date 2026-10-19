import { useState } from 'react';
import useAdminSettings from '../../hooks/useAdminSettings.js';
import { apiClient } from '../../lib/apiClient.js';
import useToast from '../../hooks/useToast.js';

export default function SettingsPanel() {
  const { items, loading, error, refresh } = useAdminSettings();
  const { showToast } = useToast();
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSave(key, rawValue) {
    let parsed;
    try { parsed = JSON.parse(rawValue); }
    catch { showToast('Value must be valid JSON (e.g. "text", 123, true, {"a":1}).', 'error'); return; }
    setSaving(true);
    try { await apiClient.put(`/admin/settings/${key}`, { value: parsed }); showToast('Setting saved.'); await refresh(); }
    catch (err) { showToast(err.message, 'error'); }
    finally { setSaving(false); }
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!newKey.trim()) { showToast('Enter a setting key.', 'error'); return; }
    await handleSave(newKey.trim(), newValue);
    setNewKey(''); setNewValue('');
  }

  return (
    <div>
      <p className="eyebrow mb-6">Site Settings</p>

      {loading ? <p className="text-mute">Loading settings…</p>
      : error ? <p className="text-terracotta" role="alert">{error}</p>
      : (
        <div className="space-y-4 mb-10">
          {items.length === 0 && <p className="text-mute">No settings configured yet.</p>}
          {items.map((setting) => <SettingRow key={setting.key} setting={setting} onSave={handleSave} saving={saving} />)}
        </div>
      )}

      <div className="border-t border-line pt-6">
        <p className="eyebrow mb-4">Add New Setting</p>
        <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
          <input value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="setting_key"
            className="border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta flex-1" />
          <input value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder='"value" or 123 or true'
            className="border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta flex-1" />
          <button type="submit" disabled={saving} className="bg-charcoal text-cream px-5 py-2 text-sm uppercase tracking-wide hover:bg-terracotta transition-colors rounded-sm disabled:opacity-60">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

function SettingRow({ setting, onSave, saving }) {
  const [value, setValue] = useState(JSON.stringify(setting.value));
  return (
    <div className="border border-line rounded-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <span className="text-sm font-medium w-full sm:w-40 flex-shrink-0">{setting.key}</span>
      <input value={value} onChange={(e) => setValue(e.target.value)}
        className="flex-1 border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta" />
      <button disabled={saving} onClick={() => onSave(setting.key, value)} className="border border-charcoal px-4 py-2 text-xs uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-sm disabled:opacity-60 whitespace-nowrap">
        Save
      </button>
    </div>
  );
}