import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';

export default function useProductOffers(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!slug) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.get(`/products/${slug}/offers`);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, refresh: load };
}