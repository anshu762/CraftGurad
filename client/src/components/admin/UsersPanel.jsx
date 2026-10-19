import { useState } from 'react';
import useAdminUsers from '../../hooks/useAdminUsers.js';
import useAuth from '../../hooks/useAuth.js';
import useToast from '../../hooks/useToast.js';
import { apiClient } from '../../lib/apiClient.js';

const ROLES = ['PUBLIC_VISITOR', 'BUYER', 'ARTISAN', 'EDITOR', 'ADMIN', 'SUPER_ADMIN'];

export default function UsersPanel() {
  const { user: me } = useAuth();
  const [roleFilter, setRoleFilter] = useState('all');
  const { items, loading, error, refresh } = useAdminUsers(roleFilter);
  const { showToast } = useToast();
  const [busyId, setBusyId] = useState(null);

  async function handleRoleChange(userId, role) {
    setBusyId(userId);
    try { await apiClient.patch(`/admin/users/${userId}`, { role }); showToast('Role updated.'); await refresh(); }
    catch (err) { showToast(err.message, 'error'); }
    finally { setBusyId(null); }
  }

  async function handleToggleActive(u) {
    setBusyId(u.id);
    try {
      await apiClient.patch(`/admin/users/${u.id}`, { isActive: !u.isActive });
      showToast(u.isActive ? 'User deactivated.' : 'User activated.');
      await refresh();
    } catch (err) { showToast(err.message, 'error'); }
    finally { setBusyId(null); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="eyebrow">All Users</p>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta">
          <option value="all">All roles</option>
          {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {loading ? <p className="text-mute">Loading users…</p>
      : error ? <p className="text-terracotta" role="alert">{error}</p>
      : items.length === 0 ? <p className="text-mute">No users found.</p>
      : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-mute">
                <th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Role</th><th className="py-2 pr-4">Status</th><th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id} className="border-b border-line">
                  <td className="py-3 pr-4">{u.name}</td>
                  <td className="py-3 pr-4 break-all">{u.email}</td>
                  <td className="py-3 pr-4">
                    <select value={u.role} disabled={busyId === u.id || u.id === me.id} onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="border border-line px-2 py-1 text-xs rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50">
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                  <td className="py-3 pr-4">{u.isActive ? 'Active' : 'Inactive'}</td>
                  <td className="py-3 pr-4">
                    <button disabled={busyId === u.id || u.id === me.id} onClick={() => handleToggleActive(u)} className="text-xs text-terracotta hover:underline disabled:opacity-50">
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}