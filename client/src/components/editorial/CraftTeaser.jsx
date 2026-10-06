import { Link } from 'react-router-dom';

export default function CraftTeaser({ title, image, description, to }) {
  return (
    <Link to={to} className="group relative block h-[60vh] overflow-hidden" data-aos="fade-up">
      <img
        src={image}
        alt={`${title} craft preview`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/55 transition-colors" />
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <h3 className="text-cream font-serif text-3xl md:text-4xl mb-2">{title}</h3>
        <p className="text-cream/85 text-sm max-w-sm mb-3">{description}</p>
        <span className="text-cream text-sm uppercase tracking-wide border-b border-cream/60 w-fit group-hover:border-terracotta group-hover:text-terracotta transition-colors">
          Explore the story →
        </span>
      </div>
    </Link>
  );
}