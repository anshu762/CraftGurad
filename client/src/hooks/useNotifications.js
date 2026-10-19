import { useCallback, useEffect, useRef, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';
import useAuth from './useAuth.js';

const POLL_INTERVAL_MS = 30000;

export default function useNotifications() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const pollRef = useRef(null);

  const fetchUnreadCount = useCallback(async () => {
    if (!user) return;
    try {
      const res = await apiClient.get('/notifications/unread-count');
      setUnreadCount(res.unreadCount || 0);
    } catch {
      // Silent — badge just skips this refresh cycle.
    }
  }, [user]);

  const fetchList = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const res = await apiClient.get('/notifications?page=1&pageSize=20');
      setItems(res.items || []);
      setUnreadCount(res.unreadCount || 0);
    } catch (err) {
      setError(err.message || 'Unable to load notifications.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const markOneRead = useCallback(async (id) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setUnreadCount((c) => Math.max(0, c - 1));
    try {
      await apiClient.patch(`/notifications/${id}/read`);
    } catch {
      fetchList();
    }
  }, [fetchList]);

  const markAllRead = useCallback(async () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    try {
      await apiClient.patch('/notifications/read-all');
    } catch {
      fetchList();
    }
  }, [fetchList]);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setUnreadCount(0);
      return undefined;
    }
    fetchUnreadCount();
    pollRef.current = setInterval(fetchUnreadCount, POLL_INTERVAL_MS);
    return () => clearInterval(pollRef.current);
  }, [user, fetchUnreadCount]);

  return { items, unreadCount, loading, error, fetchList, markOneRead, markAllRead };
}