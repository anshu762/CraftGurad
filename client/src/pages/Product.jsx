import { useParams, Link } from 'react-router-dom';
import useProduct from '../hooks/useProduct.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import ProductImageGallery from '../components/product/ProductImageGallery.jsx';
import ProductMetadata from '../components/product/ProductMetadata.jsx';
import ProductActions from '../components/product/ProductActions.jsx';
import AvailabilityLabel from '../components/gallery/AvailabilityLabel.jsx';
import Breadcrumbs from '../components/navigation/Breadcrumbs.jsx';
import GalleryGrid from '../components/gallery/GalleryGrid.jsx';
import PageLoader from '../components/layout/PageLoader.jsx';
import NotFound from './NotFound.jsx';
import { formatINR } from '../lib/format.js';

export default function Product() {
  const { slug } = useParams();
  const { product, related, loading, notFound, error } = useProduct(slug);

  useDocumentTitle(product?.name || 'Product', product?.description || 'View this documented piece on CraftGuard.');

  if (loading) return <PageLoader />;
  if (notFound) return <NotFound />;
  if (error) return <div className="max-w-xl mx-auto px-5 py-24 text-center"><p className="text-terracotta" role="alert">{error}</p></div>;
  if (!product) return null;

  const theme = product.craft === 'KASUTI' ? 'kasuti' : 'ilkal';
  const craftLabel = product.craft === 'KASUTI' ? 'Kasuti' : 'Ilkal';

  return (
    <div className="px-5 md:px-8 py-12 md:py-20 max-w-7xl mx-auto">
      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        { label: 'Gallery', to: '/gallery' },
        { label: craftLabel, to: `/gallery?craft=${product.craft.toLowerCase()}` },
        { label: product.name },
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div data-aos="fade-right"><ProductImageGallery images={product.images} theme={theme} /></div>

        <div data-aos="fade-up">
          <p className="eyebrow mb-3">{craftLabel}</p>
          <h1 className="text-3xl md:text-4xl mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-6">
            <AvailabilityLabel status={product.status} />
            {product.maker?.name && <span className="text-sm text-mute">· By {product.maker.name}{product.maker.location ? `, ${product.maker.location}` : ''}</span>}
          </div>

          {product.price && (
            <p className="text-2xl font-serif mb-6">
              {formatINR(product.price)}
              <span className="text-sm text-mute font-sans ml-2">Offers considered</span>
            </p>
          )}

          {product.description && <p className="text-base leading-relaxed text-charcoal/90 mb-6">{product.description}</p>}

          <ProductActions product={product} />
          <ProductMetadata product={product} />

          {product.provenance && (
            <div className="border-t border-line mt-8 pt-8">
              <p className="eyebrow mb-3">Provenance</p>
              <p className="text-sm text-charcoal/80 leading-relaxed">{product.provenance}</p>
            </div>
          )}

          {product.shippingInfo && (
            <div className="mt-6">
              <p className="eyebrow mb-3">Shipping</p>
              <p className="text-sm text-charcoal/80 leading-relaxed">{product.shippingInfo}</p>
            </div>
          )}
        </div>
      </div>

      {product.story && (
        <div className="max-w-prose mx-auto mt-20 pt-16 border-t border-line" data-aos="fade-up">
          <p className="eyebrow mb-4">The Story of This Piece</p>
          <p className="text-lg leading-relaxed text-charcoal/90">{product.story}</p>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-24 pt-16 border-t border-line">
          <p className="eyebrow mb-3">Related pieces</p>
          <h2 className="text-3xl md:text-4xl mb-10">More from {craftLabel}</h2>
          <GalleryGrid items={related} />
        </div>
      )}

      <div className="text-center mt-20">
        <Link to="/gallery" className="text-sm uppercase tracking-wide border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors">
          ← Back to Gallery
        </Link>
      </div>
    </div>
  );
}