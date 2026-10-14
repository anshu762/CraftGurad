import { createContext, useCallback, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const data = await apiClient.get('/auth/me');
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);

  const login = useCallback(async (email, password) => {
    const data = await apiClient.post('/auth/login', { email, password });
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await apiClient.post('/auth/register', payload);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    await apiClient.post('/auth/logout');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh: loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}