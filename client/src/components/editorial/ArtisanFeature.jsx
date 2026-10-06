export default function ArtisanFeature({ portrait, quote, name, location, craft, description, consentApproved }) {
  // Progressive disclosure + consent gate: never show identity data without approval
  const showIdentity = consentApproved;

  return (
    <section className="my-20 md:my-32 px-5 md:px-8">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div data-aos="fade-right">
          <img
            src={portrait}
            alt={showIdentity ? `Portrait of ${name}, ${craft} artisan from ${location}` : 'Artisan at work, portrait withheld pending consent'}
            className="w-full h-[60vh] object-cover"
            loading="lazy"
          />
        </div>
        <div data-aos="fade-up">
          <p className="eyebrow mb-4">The Maker</p>
          {quote && <blockquote className="font-serif italic text-2xl md:text-3xl leading-snug mb-6">“{quote}”</blockquote>}
          {showIdentity ? (
            <>
              <p className="text-lg font-medium">{name}</p>
              <p className="text-sm text-mute mb-4">{location} · {craft}</p>
            </>
          ) : (
            <p className="text-sm text-mute mb-4">Identity withheld pending consent confirmation.</p>
          )}
          {description && <p className="text-base leading-relaxed text-charcoal/90">{description}</p>}
        </div>
      </div>
    </section>
  );
}