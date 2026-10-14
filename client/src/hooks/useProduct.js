import { useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';

export default function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);
    setError('');

    apiClient.get(`/products/${slug}`)
      .then((res) => {
        if (!active) return;
        setProduct(res.product);
        return apiClient.get(`/products/${slug}/related`);
      })
      .then((res) => { if (active && res) setRelated(res.items); })
      .catch((err) => {
        if (!active) return;
        if (err.status === 404) setNotFound(true);
        else setError(err.message || 'Unable to load this product.');
      })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, [slug]);

  return { product, related, loading, notFound, error };
}