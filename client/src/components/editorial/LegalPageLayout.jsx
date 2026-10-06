export default function LegalPageLayout({ title, lastUpdated, children }) {
  return (
    <div className="max-w-prose mx-auto px-5 md:px-8 py-20 md:py-28">
      <p className="eyebrow mb-4">Policy</p>
      <h1 className="text-3xl md:text-4xl mb-4">{title}</h1>
      {lastUpdated && <p className="text-sm text-mute mb-10">Last updated: {lastUpdated}</p>}
      <div className="space-y-6 text-base leading-relaxed text-charcoal/90">{children}</div>
    </div>
  );
}