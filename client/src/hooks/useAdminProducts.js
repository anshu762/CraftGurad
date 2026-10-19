import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';

export default function useAdminProducts(status) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const query = status && status !== 'all' ? `?status=${status}` : '';
      const data = await apiClient.get(`/admin/products${query}`);
      setItems(data.items);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [status]);

  useEffect(() => { load(); }, [load]);
  return { items, loading, error, refresh: load };
}