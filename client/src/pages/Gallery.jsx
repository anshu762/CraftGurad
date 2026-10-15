import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts.js';
import FilterBar from '../components/gallery/FilterBar.jsx';
import GalleryGrid from '../components/gallery/GalleryGrid.jsx';
import EmptyState from '../components/gallery/EmptyState.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Gallery() {
  useDocumentTitle('Gallery', 'Browse the CraftGuard archive of documented Kasuti and Ilkal pieces.');
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => ({
    craft: searchParams.get('craft') || 'all',
    availability: searchParams.get('availability') || 'all',
    sort: searchParams.get('sort') || 'featured',
  }), [searchParams]);

  const { items, total, loading, error } = useProducts({ ...filters, pageSize: 24 });

  function handleFilterChange(next) {
    const params = {};
    if (next.craft !== 'all') params.craft = next.craft;
    if (next.availability !== 'all') params.availability = next.availability;
    if (next.sort !== 'featured') params.sort = next.sort;
    setSearchParams(params);
  }

  return (
    <div className="px-5 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="mb-12 max-w-2xl">
        <p className="eyebrow mb-4">The Archive</p>
        <h1 className="text-3xl md:text-5xl mb-4">Products</h1>
        <p className="text-mute">A curated collection of documented Kasuti and Ilkal pieces — each one connected to a maker, a process, and a story.</p>
      </div>

      <FilterBar filters={filters} onChange={handleFilterChange} />

      <p className="sr-only" role="status" aria-live="polite">
        {loading ? 'Loading results…' : `${total} result${total === 1 ? '' : 's'} found.`}
      </p>

      {error && <p className="text-terracotta text-sm mb-8" role="alert">{error}</p>}

      {loading ? (
        <GallerySkeleton />
      ) : items.length === 0 ? (
        <EmptyState message="No pieces match these filters yet. Try exploring the full collection instead." actionLabel="Clear filters" onAction={() => setSearchParams({})} />
      ) : (
        <GalleryGrid items={items} />
      )}
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse motion-reduce:animate-none">
          <div className="bg-line/50 aspect-[4/5] mb-3" />
          <div className="bg-line/50 h-4 w-2/3 mb-2" />
          <div className="bg-line/50 h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}