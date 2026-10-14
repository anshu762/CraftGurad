import { createContext, useCallback, useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient.js';
import useAuth from '../hooks/useAuth.js';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async () => {
    if (!user) { setCart({ items: [] }); return; }
    setLoading(true);
    try {
      const data = await apiClient.get('/cart');
      setCart(data.cart);
    } catch {
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { loadCart(); }, [loadCart]);

  const addToCart = useCallback(async (productId) => {
    const data = await apiClient.post('/cart/items', { productId });
    setCart(data.cart);
    return data.cart;
  }, []);

  const updateDraftAmount = useCallback(async (itemId, draftAmount) => {
    const data = await apiClient.patch(`/cart/items/${itemId}`, { draftAmount });
    setCart(data.cart);
  }, []);

  const removeFromCart = useCallback(async (itemId) => {
    const data = await apiClient.delete(`/cart/items/${itemId}`);
    setCart(data.cart);
  }, []);

  const clearCart = useCallback(async () => {
    const data = await apiClient.delete('/cart');
    setCart(data.cart);
  }, []);

  const isInCart = useCallback(
    (productId) => cart.items.some((i) => i.product.id === productId),
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateDraftAmount, removeFromCart, clearCart, isInCart, refresh: loadCart }}>
      {children}
    </CartContext.Provider>
  );
}