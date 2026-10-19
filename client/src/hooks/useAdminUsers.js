import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';

export default function useAdminUsers(role) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const query = role && role !== 'all' ? `?role=${role}` : '';
      const data = await apiClient.get(`/admin/users${query}`);
      setItems(data.items);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [role]);

  useEffect(() => { load(); }, [load]);
  return { items, loading, error, refresh: load };
}