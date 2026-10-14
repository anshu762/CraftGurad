const CRAFTS = [{ value: 'all', label: 'All' }, { value: 'kasuti', label: 'Kasuti' }, { value: 'ilkal', label: 'Ilkal' }];
const AVAILABILITY = [{ value: 'all', label: 'All' }, { value: 'available', label: 'Available' }, { value: 'offer_submitted', label: 'Offer submitted' }, { value: 'sold', label: 'Sold' }];
const SORTS = [{ value: 'featured', label: 'Featured' }, { value: 'newest', label: 'Newest' }, { value: 'price_asc', label: 'Price: Low to High' }, { value: 'price_desc', label: 'Price: High to Low' }];

export default function FilterBar({ filters, onChange }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  const hasActiveFilters = filters.craft !== 'all' || filters.availability !== 'all';

  return (
    <div className="mb-10">
      <div className="flex flex-wrap items-center gap-8 mb-4">
        <fieldset>
          <legend className="eyebrow mb-2">Craft</legend>
          <div className="flex gap-2" role="group" aria-label="Filter by craft">
            {CRAFTS.map((c) => (
              <button key={c.value} onClick={() => update('craft', c.value)} aria-pressed={filters.craft === c.value}
                className={`px-4 py-2 text-sm border rounded-sm transition-colors ${filters.craft === c.value ? 'bg-charcoal text-cream border-charcoal' : 'border-line hover:border-charcoal'}`}>
                {c.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-2">Availability</legend>
          <div className="flex gap-2" role="group" aria-label="Filter by availability">
            {AVAILABILITY.map((a) => (
              <button key={a.value} onClick={() => update('availability', a.value)} aria-pressed={filters.availability === a.value}
                className={`px-4 py-2 text-sm border rounded-sm transition-colors ${filters.availability === a.value ? 'bg-charcoal text-cream border-charcoal' : 'border-line hover:border-charcoal'}`}>
                {a.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="sort-select" className="eyebrow mb-2 block">Sort by</label>
          <select id="sort-select" value={filters.sort} onChange={(e) => update('sort', e.target.value)} className="border border-line px-4 py-2 text-sm rounded-sm bg-paper">
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-mute">Active filters:</span>
          {filters.craft !== 'all' && <Chip label={CRAFTS.find((c) => c.value === filters.craft).label} onRemove={() => update('craft', 'all')} />}
          {filters.availability !== 'all' && <Chip label={AVAILABILITY.find((a) => a.value === filters.availability).label} onRemove={() => update('availability', 'all')} />}
        </div>
      )}
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <button onClick={onRemove} className="inline-flex items-center gap-2 bg-line/40 px-3 py-1 rounded-full text-xs hover:bg-line/70 transition-colors">
      {label} <span aria-hidden="true">✕</span><span className="sr-only">Remove filter</span>
    </button>
  );
}