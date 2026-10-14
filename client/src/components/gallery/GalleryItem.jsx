import { Link } from 'react-router-dom';
import ResponsiveImage from '../media/ResponsiveImage.jsx';
import AvailabilityLabel from './AvailabilityLabel.jsx';

export default function GalleryItem({ product, featured = false }) {
  const image = product.images?.[0];
  const theme = product.craft === 'KASUTI' ? 'kasuti' : 'ilkal';

  return (
    <Link to={`/product/${product.slug}`} className={`group block ${featured ? 'sm:col-span-2 sm:row-span-2' : ''}`} data-aos="fade-up">
      <div className="overflow-hidden mb-3">
        <ResponsiveImage
          src={image?.url}
          alt={image?.altText || `${product.name} photograph`}
          theme={theme}
          label={image?.altText}
          aspect={featured ? '1/1' : '4/5'}
          className="transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow mb-1">{product.craft === 'KASUTI' ? 'Kasuti' : 'Ilkal'}</p>
          <h3 className="font-serif text-lg leading-snug">{product.name}</h3>
          {product.maker?.name && <p className="text-xs text-mute mt-1">By {product.maker.name}</p>}
        </div>
        <AvailabilityLabel status={product.status} />
      </div>
      <span className="text-sm text-terracotta mt-2 inline-block border-b border-transparent group-hover:border-terracotta transition-colors">
        View the story →
      </span>
    </Link>
  );
}