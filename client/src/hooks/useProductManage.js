import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';

export default function useProductManage(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get(`/products/manage/${id}`);
      setProduct(data.product);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  return { product, loading, error, refresh: load };
}