import { useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';

export default function useFeaturedProducts(limit = 3) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    apiClient.get(`/products?featured=true&pageSize=${limit}`)
      .then((res) => { if (active) setItems(res.items); })
      .catch(() => { if (active) setItems([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [limit]);

  return { items, loading };
}