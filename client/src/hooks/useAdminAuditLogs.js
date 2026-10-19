import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';

export default function useAdminAuditLogs() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (targetPage = 1) => {
    setLoading(true);
    try {
      const data = await apiClient.get(`/admin/audit-logs?page=${targetPage}&pageSize=30`);
      setItems(data.items); setPage(data.page); setTotalPages(data.totalPages);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(1); }, [load]);
  return { items, page, totalPages, loading, error, goToPage: load };
}