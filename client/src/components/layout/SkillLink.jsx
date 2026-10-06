export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-charcoal focus:text-cream focus:px-4 focus:py-2 focus:rounded"
    >
      Skip to content
    </a>
  );
}