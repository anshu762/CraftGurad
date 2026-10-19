import { Link } from 'react-router-dom';
import Hero from '../components/editorial/Hero.jsx';
import EditorialSection from '../components/editorial/EditorialSection.jsx';
import ArtisanFeature from '../components/editorial/ArtisanFeature.jsx';
import PullQuote from '../components/editorial/PullQuote.jsx';
import CraftTeaser from '../components/editorial/CraftTeaser.jsx';
import SectionDivider from '../components/editorial/SectionDivider.jsx';
import CallToAction from '../components/editorial/CallToAction.jsx';
import FeaturedProductCard from '../components/gallery/FeaturedProductCard.jsx';
import useFeaturedProducts from '../hooks/useFeaturedProducts.js';
import { IMAGES } from '../lib/images.js';

function FeaturedSection() {
  const { items, loading } = useFeaturedProducts(3);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse motion-reduce:animate-none">
            <div className="bg-line/50 aspect-[4/5] mb-4" />
            <div className="bg-line/50 h-3 w-1/3 mb-2" />
            <div className="bg-line/50 h-5 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-mute text-sm">Featured pieces will appear here once products are published.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      {items.map((product, index) => (
        <FeaturedProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* ==================== HERO ==================== */}
      <Hero
        image={IMAGES.heroMain}
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
        image={IMAGES.documentaryWide1}
        caption="A weaving workshop, early morning light."
      />

      {/* ==================== CRAFT INTRODUCTION ==================== */}
      <EditorialSection
        variant="image-right"
        eyebrow="Two traditions"
        heading="Kasuti and Ilkal"
        body="Kasuti is a form of hand embroidery carried through pattern and memory. Ilkal is a handloom weaving tradition known for its distinct borders and pallus. Both are living practices, shaped daily by the artisans who carry them forward."
        image={IMAGES.kasutiIlkalIntro}
      />

      {/* ==================== ARTISAN FEATURE ==================== */}
      <ArtisanFeature
        portrait={IMAGES.artisanPortrait1}
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
            image={IMAGES.kasutiTeaser}
            description="Stitch, fabric, tools, repetition and patient handwork."
            index={0}
          />
          <CraftTeaser
            title="Ilkal"
            subtitle="Handloom Weaving"
            to="/ilkal"
            image={IMAGES.ilkalTeaser}
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
        image={IMAGES.kasutiProcess}
      />

      {/* ==================== ILKAL PROCESS ==================== */}
      <EditorialSection
        variant="image-right"
        eyebrow="Ilkal · The Weave"
        heading="On the loom"
        body="Distinct borders and pallus woven using a technique unique to the Ilkal region, carried by generations of weaving families."
        image={IMAGES.ilkalProcess}
      />

      {/* ==================== PULL QUOTE ==================== */}
      <PullQuote
        quote="These are not relics. They are living traditions, made today, by hands that know them best."
        attribution="CraftGuard"
      />

      {/* ==================== FEATURED COLLECTION (live backend data) ==================== */}
      <section className="px-5 md:px-8 my-20 md:my-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12" data-aos="fade-up">
            <div>
              <p className="eyebrow mb-3 !text-terracotta tracking-widest">From the archive</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">Featured pieces</h2>
            </div>
            <Link
              to="/gallery"
              className="text-sm uppercase tracking-widest border-b border-charcoal pb-2 hover:text-terracotta hover:border-terracotta transition-all duration-500 hidden md:block"
            >
              View full product catalog →
            </Link>
          </div>

          <FeaturedSection />

          <div className="text-center mt-12 md:hidden">
            <Link
              to="/gallery"
              className="inline-block px-8 py-3 bg-charcoal text-cream text-sm uppercase tracking-widest hover:bg-terracotta transition-colors duration-500"
            >
              View full product catalog
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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

      <hr  className="border-white/75 border-2" />
    </div>
  );
}