import { useState, useRef, useEffect, useCallback } from 'react';
import ResponsiveImage from '../media/ResponsiveImage.jsx';

export default function ProductImageGallery({ images, theme }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  const hasImages = images && images.length > 0;
  const active = hasImages ? images[activeIndex] : null;

  const goTo = useCallback((index) => setActiveIndex((index + images.length) % images.length), [images?.length]);

  function openLightbox(e) {
    triggerRef.current = e.currentTarget;
    setLightboxOpen(true);
  }
  function closeLightbox() {
    setLightboxOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!lightboxOpen) return;
    closeButtonRef.current?.focus();
    function handleKeyDown(e) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (e.key === 'Tab') { e.preventDefault(); closeButtonRef.current?.focus(); }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = ''; };
  }, [lightboxOpen, activeIndex, goTo]);

  if (!hasImages) return <ResponsiveImage theme={theme} label="Product photography pending" aspect="4/5" />;

  return (
    <div>
      <button onClick={openLightbox} className="block w-full mb-4" aria-label={`View larger image: ${active.altText}`}>
        <ResponsiveImage src={active.url} alt={active.altText} theme={theme} label={active.altText} aspect="4/5" priority />
      </button>

      {images.length > 1 && (
        <div className="flex gap-3" role="tablist" aria-label="Product images">
          {images.map((img, i) => (
            <button key={img.id} role="tab" aria-selected={i === activeIndex} aria-label={`Show image ${i + 1} of ${images.length}: ${img.altText}`} onClick={() => setActiveIndex(i)}
              className={`w-16 h-16 overflow-hidden border-2 rounded-sm flex-shrink-0 ${i === activeIndex ? 'border-terracotta' : 'border-transparent opacity-70 hover:opacity-100'}`}>
              <ResponsiveImage src={img.url} alt="" theme={theme} label="" aspect="1/1" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div role="dialog" aria-modal="true" aria-label={`Image viewer: ${active.altText}`} className="fixed inset-0 z-[300] bg-charcoal/95 flex flex-col items-center justify-center p-5">
          <button ref={closeButtonRef} onClick={closeLightbox} className="absolute top-5 right-5 text-cream text-sm uppercase tracking-wide border border-cream/40 px-4 py-2 rounded-sm hover:bg-cream hover:text-charcoal transition-colors">
            Close ✕
          </button>
          <div className="max-w-4xl w-full">
            <ResponsiveImage src={active.url} alt={active.altText} theme={theme} label={active.altText} aspect="4/5" />
          </div>
          {images.length > 1 && (
            <div className="flex items-center gap-6 mt-6">
              <button onClick={() => goTo(activeIndex - 1)} aria-label="Previous image" className="text-cream text-2xl hover:text-terracotta">←</button>
              <span className="text-cream/80 text-sm">{activeIndex + 1} / {images.length}</span>
              <button onClick={() => goTo(activeIndex + 1)} aria-label="Next image" className="text-cream text-2xl hover:text-terracotta">→</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}