import { Link } from 'react-router-dom';

export default function CraftTeaser({ 
  title, 
  image, 
  description, 
  to,
  subtitle,
  index = 0,
}) {
  return (
    <Link 
      to={to} 
      className="group relative block h-[65vh] md:h-[75vh] overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="1200"
    >
      {/* Image with zoom effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt={`${title} craft preview`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
          loading="lazy"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent group-hover:from-charcoal/95 group-hover:via-charcoal/60 transition-colors duration-700" />
      <div className="absolute inset-0 bg-terracotta/0 group-hover:bg-terracotta/10 transition-colors duration-700" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
        {/* Decorative line */}
        <div className="w-0 group-hover:w-16 h-0.5 bg-terracotta mb-6 transition-all duration-700" />

        {/* Title */}
        <h3 className="text-cream font-serif text-4xl md:text-5xl lg:text-6xl mb-3 leading-tight">
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-cream/70 text-sm uppercase tracking-widest mb-3">
            {subtitle}
          </p>
        )}

        {/* Description */}
        <p className="text-cream/85 text-base md:text-lg max-w-md mb-6 font-light">
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-3 text-cream text-sm uppercase tracking-widest">
          <span className="border-b border-cream/60 pb-1 group-hover:border-terracotta group-hover:text-terracotta transition-all duration-500">
            Explore the story
          </span>
          <svg 
            className="w-5 h-5 transform group-hover:translate-x-3 transition-transform duration-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Border highlight */}
      <div className="absolute inset-0 border border-cream/20 group-hover:border-terracotta/40 transition-colors duration-700 m-4" />
    </Link>
  );
}