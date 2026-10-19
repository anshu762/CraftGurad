// client/src/components/editorial/RelatedProductsPreview.jsx
import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts.js';
import GalleryItem from '../gallery/GalleryItem.jsx';

export default function RelatedProductsPreview({ craftLabel }) {
  const craftCode = craftLabel ? craftLabel.toLowerCase() : 'all';
  const { items, loading, error } = useProducts({ craft: craftCode, sort: 'featured', pageSize: 3 });

  return (
    <section className="px-5 md:px-8 my-20 md:my-32">
      <div className="max-w-7xl mx-auto">
        <p className="eyebrow mb-3">Related pieces</p>
        <h2 className="text-3xl md:text-4xl mb-10">From this tradition</h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" aria-hidden="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse motion-reduce:animate-none">
                <div className="bg-line/50 aspect-[4/5] mb-3" />
                <div className="bg-line/50 h-4 w-2/3 mb-2" />
                <div className="bg-line/50 h-3 w-1/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-terracotta text-sm" role="alert">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-mute">No pieces from this tradition are published yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((product) => (
              <GalleryItem key={product.id} product={product} />
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-10">
            <Link
              to={`/gallery?craft=${craftCode}`}
              className="text-sm text-terracotta border-b border-terracotta/40 hover:border-terracotta transition-colors"
            >
              View all {craftLabel} pieces →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}