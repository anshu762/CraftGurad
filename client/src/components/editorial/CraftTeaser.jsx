import { Link } from 'react-router-dom';
import ResponsiveImage from '../media/ResponsiveImage.jsx';


export default function CraftTeaser({ title, subtitle, image, description, to, index = 0 }) {
  return (
    <Link
      to={to}
      className="group relative block h-[60vh] overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <ResponsiveImage
        src={image.src}
        alt={`${title} craft preview`}
        theme={image.theme}
        label={image.label}
        fill
        className="transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/55 transition-colors" />
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        {subtitle && <p className="eyebrow !text-cream/70 mb-2">{subtitle}</p>}
        <h3 className="text-cream font-serif text-3xl md:text-4xl mb-2">{title}</h3>
        <p className="text-cream/85 text-sm max-w-sm mb-3">{description}</p>
        <span className="text-cream text-sm uppercase tracking-wide border-b border-cream/60 w-fit group-hover:border-terracotta group-hover:text-terracotta transition-colors">
          Explore the story →
        </span>
      </div>
    </Link>
  );
}