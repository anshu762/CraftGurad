import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';

export default function useAdminArtisans(consentStatus) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const query = consentStatus && consentStatus !== 'all' ? `?consentStatus=${consentStatus}` : '';
      const data = await apiClient.get(`/admin/artisans${query}`);
      setItems(data.items);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [consentStatus]);

  useEffect(() => { load(); }, [load]);
  return { items, loading, error, refresh: load };
}