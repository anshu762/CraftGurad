import Hero from '../components/editorial/Hero.jsx';
import EditorialSection from '../components/editorial/EditorialSection.jsx';
import ArtisanFeature from '../components/editorial/ArtisanFeature.jsx';
import PullQuote from '../components/editorial/PullQuote.jsx';
import CraftTeaser from '../components/editorial/CraftTeaser.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Placeholder content
const PLACEHOLDER = '/images/placeholder/';

// Featured Product Component (modular)
function FeaturedProduct({ product, index }) {
  return (
    <div 
      className="group cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="1000"
    >
      <div className="overflow-hidden mb-4 relative">
        <div className="aspect-[4/5] bg-line/60 group-hover:bg-line/80 transition-colors duration-700">
          <img 
            src={product.image || `${PLACEHOLDER}product-placeholder.jpg`}
            alt={product.name || 'Featured product'}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            loading="lazy"
          />
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-700" />
      </div>

      <div className="space-y-2">
        <p className="eyebrow !text-terracotta tracking-widest">{product.craft || 'Kasuti'}</p>
        <p className="font-serif text-xl group-hover:text-terracotta transition-colors duration-500">
          {product.name || 'Product name pending'}
        </p>
        {product.price && (
          <p className="text-sm text-mute">₹{product.price}</p>
        )}
      </div>
    </div>
  );
}

// Section Divider Component (modular)
function SectionDivider({ className = '' }) {
  return (
    <div className={`w-24 h-0.5 bg-terracotta mx-auto my-16 ${className}`} />
  );
}

// Call-to-Action Component (modular)
function CallToAction({ 
  eyebrow, 
  heading, 
  ctaText, 
  ctaLink, 
  variant = 'light',
}) {
  const isDark = variant === 'dark';

  return (
    <section className={`py-24 px-5 md:px-8 text-center ${isDark ? 'bg-charcoal text-cream' : ''}`}>
      <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-duration="1200">
        {eyebrow && (
          <p className={`eyebrow mb-4 tracking-widest ${isDark ? '!text-cream/70' : '!text-terracotta'}`}>
            {eyebrow}
          </p>
        )}

        {heading && (
          <h2 className={`font-serif text-4xl md:text-6xl mb-10 ${isDark ? 'text-cream' : ''}`}>
            {heading}
          </h2>
        )}

        {ctaText && (
          <Link
            to={ctaLink}
            className={`inline-block px-10 py-4 text-sm uppercase tracking-widest transition-all duration-500 ${
              isDark 
                ? 'bg-cream text-charcoal hover:bg-terracotta hover:text-cream'
                : 'bg-charcoal text-cream hover:bg-terracotta'
            }`}
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}

// Main Homepage Component
export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([
    { name: 'Product name pending', craft: 'Kasuti', price: 'TBD', image: null },
    { name: 'Product name pending', craft: 'Ilkal', price: 'TBD', image: null },
    { name: 'Product name pending', craft: 'Kasuti', price: 'TBD', image: null },
  ]);

  useEffect(() => {
    // In production, fetch from API: /api/products?featured=true
    // For now, using placeholder data
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* ==================== HERO SECTION ==================== */}
      <Hero
        image={`${PLACEHOLDER}hero-main.webp`}
        alt="A Kasuti artisan's hands mid-stitch on red cotton fabric, workshop light"
        eyebrow="A CraftGuard Documentary Archive"
        title="The Hands Behind Kasuti & Ilkal"
        subtitle="A living archive of craft, makers and market access."
        primaryActions={[
          { href: '/kasuti', label: 'Explore Kasuti' },
          { href: '/ilkal', label: 'Explore Ilkal' },
        ]}
        secondaryAction={{ href: '/gallery', label: 'Enter the Gallery' }}
      />


      {/* ==================== OPENING STATEMENT ==================== */}
      <EditorialSection
        variant="text-only"
        eyebrow="About the project"
        heading="Why we document"
        body="CRAFTGUARD is a visual archive of the people, gestures and knowledge behind Kasuti and Ilkal. Through documentary photography and the words of makers, the project brings craft stories closer to audiences while creating a more direct, respectful path to considered buying."
      />


      {/* ==================== DOCUMENTARY IMAGE ==================== */}
      <EditorialSection
        variant="full-bleed"
        image={`${PLACEHOLDER}documentary-wide-1.jpg`}
        imageAlt="Wide documentary shot of a weaving workshop with natural light"
        caption="A weaving workshop, early morning light. Photograph: Dhruti."
      />


      {/* ==================== CRAFT INTRODUCTION ==================== */}
      <EditorialSection
        variant="image-right"
        eyebrow="Two traditions"
        heading="Kasuti and Ilkal"
        body="Kasuti is a form of hand embroidery carried through pattern and memory. Ilkal is a handloom weaving tradition known for its distinct borders and pallus. Both are living practices, shaped daily by the artisans who carry them forward."
        image={`${PLACEHOLDER}kasuti-ilkal-intro.jpg`}
        imageAlt="Side by side texture of Kasuti embroidery and Ilkal weave"
      />


      {/* ==================== ARTISAN FEATURE ==================== */}
      <ArtisanFeature
        portrait={`${PLACEHOLDER}artisan-portrait-1.jpg`}
        quote="Every stitch carries what my mother taught me."
        name="Artisan name pending consent"
        location="Karnataka"
        craft="Kasuti embroidery"
        description="A short contextual description of this artisan's practice and history will appear here once consent documentation is finalized."
        consentApproved={false}
        index={0}
      />


      {/* ==================== CRAFT TEASERS ==================== */}
      <section className="px-5 md:px-8 my-20 md:my-32">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="eyebrow mb-4 !text-terracotta tracking-widest">Two living traditions</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">Begin the story</h2>
          <SectionDivider />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-w-7xl mx-auto">
          <CraftTeaser
            title="Kasuti"
            subtitle="Hand Embroidery"
            to="/kasuti"
            image={`${PLACEHOLDER}kasuti-teaser.jpg`}
            description="Stitch, fabric, tools, repetition and patient handwork."
            index={0}
          />
          <CraftTeaser
            title="Ilkal"
            subtitle="Handloom Weaving"
            to="/ilkal"
            image={`${PLACEHOLDER}ilkal-teaser.jpg`}
            description="Border, pallu, loom and a regional weaving identity."
            index={1}
          />
        </div>
      </section>


      {/* ==================== KASUTI PROCESS ==================== */}
      <EditorialSection
        variant="image-left"
        eyebrow="Kasuti · The Making"
        heading="Thread by thread"
        body="Geometric motifs built through counted stitches — a practice of precision, memory and repetition passed hand to hand."
        image={`${PLACEHOLDER}kasuti-process.jpg`}
        imageAlt="Close-up of Kasuti embroidery stitching in progress"
      />


      {/* ==================== ILKAL PROCESS ==================== */}
      <EditorialSection
        variant="image-right"
        eyebrow="Ilkal · The Weave"
        heading="On the loom"
        body="Distinct borders and pallus woven using a technique unique to the Ilkal region, carried by generations of weaving families."
        image={`${PLACEHOLDER}ilkal-process.jpg`}
        imageAlt="Weaver's hands working an Ilkal saree on a traditional loom"
      />


      {/* ==================== PULL QUOTE ==================== */}
      <PullQuote
        quote="These are not relics. They are living traditions, made today, by hands that know them best."
        attribution="CraftGuard"
      />


      {/* ==================== FEATURED COLLECTION ==================== */}
      <section className="px-5 md:px-8 my-20 md:my-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-12" data-aos="fade-up">
            <div>
              <p className="eyebrow mb-3 !text-terracotta tracking-widest">From the archive</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">Featured pieces</h2>
            </div>
            <Link 
              to="/gallery" 
              className="text-sm uppercase tracking-widest border-b border-charcoal pb-2 hover:text-terracotta hover:border-terracotta transition-all duration-500 hidden md:block"
            >
              View full gallery →
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {featuredProducts.map((product, index) => (
              <FeaturedProduct 
                key={index} 
                product={product} 
                index={index}
              />
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="text-center mt-12 md:hidden">
            <Link 
              to="/gallery" 
              className="inline-block px-8 py-3 bg-charcoal text-cream text-sm uppercase tracking-widest hover:bg-terracotta transition-colors duration-500"
            >
              View full gallery
            </Link>
          </div>
        </div>
      </section>


      {/* ==================== ABOUT SECTION ==================== */}
      <EditorialSection
        variant="text-only"
        eyebrow="About CraftGuard"
        heading="Documentation with consent, at its core"
        body="CraftGuard exists to give artisans visibility while protecting their consent and privacy — building a bridge between makers and audiences without flattening the craft into a catalogue."
      />

      <div className="text-center mb-20" data-aos="fade-up">
        <Link 
          to="/about" 
          className="text-sm uppercase tracking-widest border-b border-charcoal pb-2 hover:text-terracotta hover:border-terracotta transition-all duration-500 inline-flex items-center gap-2"
        >
          Read the full story
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>


      {/* ==================== FINAL CTA ==================== */}
      <CallToAction
        eyebrow="Begin here"
        heading="Step into the archive of Kasuti and Ilkal."
        ctaText="Enter the Gallery"
        ctaLink="/gallery"
        variant="dark"
      />
    </main>
  );
}