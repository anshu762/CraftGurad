import { useEffect, useState } from 'react';

/** Decorative scroll-progress indicator — purely visual pacing cue per spec §4.6. */
export default function StoryProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div aria-hidden="true" className="fixed top-16 md:top-20 left-0 right-0 h-[2px] bg-line/40 z-40">
      <div className="h-full bg-terracotta transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}