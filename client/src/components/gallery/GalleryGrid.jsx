import GalleryItem from './GalleryItem.jsx';

export default function GalleryGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {items.map((product, i) => (
        <GalleryItem key={product.id} product={product} featured={i === 0} />
      ))}
    </div>
  );
}