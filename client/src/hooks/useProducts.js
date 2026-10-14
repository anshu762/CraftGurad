import { useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';

export default function useProducts({ craft, availability, sort, page = 1, pageSize = 12 }) {
  const [data, setData] = useState({ items: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    const params = new URLSearchParams();
    if (craft && craft !== 'all') params.set('craft', craft);
    if (availability && availability !== 'all') params.set('availability', availability);
    if (sort) params.set('sort', sort);
    params.set('page', page);
    params.set('pageSize', pageSize);

    apiClient.get(`/products?${params.toString()}`)
      .then((res) => { if (active) setData(res); })
      .catch((err) => { if (active) setError(err.message || 'Unable to load products.'); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, [craft, availability, sort, page, pageSize]);

  return { ...data, loading, error };
}