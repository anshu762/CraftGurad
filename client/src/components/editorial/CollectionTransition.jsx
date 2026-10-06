import { Link } from 'react-router-dom';
import ResponsiveImage from '../media/ResponsiveImage.jsx';

export default function CollectionTransition({ craft, craftLabel, image }) {
  return (
    <section className="relative my-20 md:my-32 h-[70vh] overflow-hidden" data-aos="fade-up">
      <ResponsiveImage src={image.src} alt={image.alt} theme={image.theme} label={image.label} fill />
      <div className="absolute inset-0 bg-charcoal/55" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
        <p className="eyebrow !text-cream/80 mb-4">05 — The Collection</p>
        <h2 className="font-serif text-cream text-3xl md:text-5xl mb-8 max-w-2xl">
          Explore documented {craftLabel} pieces
        </h2>
        <Link
          to={`/gallery?craft=${craft}`}
          className="inline-block bg-cream text-charcoal px-8 py-3 text-sm uppercase tracking-wide hover:bg-terracotta hover:text-cream transition-colors"
        >
          View the Collection
        </Link>
      </div>
    </section>
  );
}