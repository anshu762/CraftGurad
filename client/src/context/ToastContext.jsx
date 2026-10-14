import { createContext, useCallback, useState } from 'react';

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((toast) => toast.id !== id)), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="fixed bottom-5 right-5 z-[200] flex flex-col gap-3 max-w-xs">
        {toasts.map((t) => (
          <div key={t.id} role="status" className={`px-4 py-3 rounded-sm shadow-lg text-sm text-cream ${t.type === 'error' ? 'bg-terracotta' : 'bg-charcoal'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}