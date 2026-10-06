import { useEffect } from 'react';

export default function useDocumentTitle(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} — CraftGuard` : 'CraftGuard';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDescription = metaDesc?.getAttribute('content');
    if (description && metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDescription) metaDesc.setAttribute('content', prevDescription);
    };
  }, [title, description]);
}