export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-live="polite">
      <span className="eyebrow animate-pulse motion-reduce:animate-none">Loading CraftGuard…</span>
    </div>
  );
}