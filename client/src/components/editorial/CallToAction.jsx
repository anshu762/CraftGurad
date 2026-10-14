import { Link } from 'react-router-dom';

export default function CallToAction({ eyebrow, heading, ctaText, ctaLink, variant = 'light' }) {
  const isDark = variant === 'dark';

  return (
    <section className={`py-24 px-5 md:px-8 text-center ${isDark ? 'bg-charcoal text-cream' : ''}`}>
      <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-duration="1200">
        {eyebrow && (
          <p className={`eyebrow mb-4 tracking-widest ${isDark ? '!text-cream/70' : '!text-terracotta'}`}>
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className={`font-serif text-4xl md:text-6xl mb-10 ${isDark ? 'text-cream' : ''}`}>{heading}</h2>
        )}
        {ctaText && (
          <Link
            to={ctaLink}
            className={`inline-block px-10 py-4 text-sm uppercase tracking-widest transition-all duration-500 ${
              isDark ? 'bg-cream text-charcoal hover:bg-terracotta hover:text-cream' : 'bg-charcoal text-cream hover:bg-terracotta'
            }`}
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}