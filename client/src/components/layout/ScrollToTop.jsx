import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Resets scroll position on every route change, matching traditional
// multi-page navigation behavior. If the new URL includes a hash
// (e.g. /about#team), it scrolls to that element instead of the top.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}