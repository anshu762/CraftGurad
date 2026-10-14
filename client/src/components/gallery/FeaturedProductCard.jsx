import { Link } from 'react-router-dom';
import ResponsiveImage from '../media/ResponsiveImage.jsx';
import { formatINR } from '../../lib/format.js';

export default function FeaturedProductCard({ product, index = 0 }) {
  const image = product.images?.[0];
  const theme = product.craft === 'KASUTI' ? 'kasuti' : 'ilkal';
  const craftLabel = product.craft === 'KASUTI' ? 'Kasuti' : 'Ilkal';

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="1000"
    >
      <div className="overflow-hidden mb-4 relative">
        <ResponsiveImage
          src={image?.url}
          alt={image?.altText || `${product.name} photograph`}
          theme={theme}
          label={image?.altText}
          aspect="4/5"
          className="transform group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-700" />
      </div>
      <div className="space-y-2">
        <p className="eyebrow !text-terracotta tracking-widest">{craftLabel}</p>
        <p className="font-serif text-xl group-hover:text-terracotta transition-colors duration-500">
          {product.name}
        </p>
        {product.price && <p className="text-sm text-mute">{formatINR(product.price)}</p>}
      </div>
    </Link>
  );
}