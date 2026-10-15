import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';

export default function useAdminOffers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.get('/admin/offers');
      setItems(data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { items, loading, error, refresh: load };
}