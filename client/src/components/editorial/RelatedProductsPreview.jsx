import ResponsiveImage from '../media/ResponsiveImage.jsx';

// Static preview for now — wired to live /api/products?craft= in Phase 3
export default function RelatedProductsPreview({ craftLabel }) {
  return (
    <section className="px-5 md:px-8 my-20 md:my-32">
      <div className="max-w-7xl mx-auto">
        <p className="eyebrow mb-3">Related pieces</p>
        <h2 className="text-3xl md:text-4xl mb-10">From this tradition</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-line p-3" data-aos="fade-up" data-aos-delay={i * 100}>
              <ResponsiveImage alt={`${craftLabel} product photograph pending`} theme="neutral" label="Product photo pending" aspect="4/5" />
              <p className="eyebrow mt-3 mb-1">{craftLabel}</p>
              <p className="font-serif text-lg">Product name pending</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}