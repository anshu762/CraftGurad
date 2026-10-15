import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';

export default function useArtisanProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.get('/artisans/me');
      setProfile(data.profile);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { profile, loading, error, refresh: load };
}