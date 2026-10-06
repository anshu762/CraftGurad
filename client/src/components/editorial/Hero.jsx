export default function Hero({
  image,
  alt,
  eyebrow,
  title,
  subtitle,
  primaryActions = [],
  secondaryAction,
}) {
  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden" aria-label={alt}>
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchpriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-12 pb-16 md:pb-24 max-w-5xl">
        {eyebrow && <p className="eyebrow !text-cream/80 mb-4" data-aos="fade-up">{eyebrow}</p>}
        <h1
          className="text-cream font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-5"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-cream/90 text-base md:text-lg max-w-xl mb-8" data-aos="fade-up" data-aos-delay="200">
            {subtitle}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4" data-aos="fade-up" data-aos-delay="300">
          {primaryActions.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="bg-cream text-charcoal px-6 py-3 text-sm tracking-wide uppercase font-medium hover:bg-terracotta hover:text-cream transition-colors rounded-sm"
            >
              {a.label}
            </a>
          ))}
          {secondaryAction && (
            <a
              href={secondaryAction.href}
              className="text-cream border-b border-cream/60 pb-1 text-sm tracking-wide uppercase hover:border-terracotta hover:text-terracotta transition-colors"
            >
              {secondaryAction.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}