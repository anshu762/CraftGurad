import Hero from '../components/editorial/Hero.jsx';
import EditorialSection from '../components/editorial/EditorialSection.jsx';
import ArtisanFeature from '../components/editorial/ArtisanFeature.jsx';
import PullQuote from '../components/editorial/PullQuote.jsx';
import CraftTeaser from '../components/editorial/CraftTeaser.jsx';
import { Link } from 'react-router-dom';

// Placeholder content — to be replaced once Dhruti's media + approved copy are delivered (see Phase 1 media checklist §13.5)
const PLACEHOLDER = '/images/placeholder/';

export default function Home() {
  return (
    <>
      {/* 1. Full-screen editorial hero */}
      <Hero
        image={`${PLACEHOLDER}hero-main.jpg`}
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

      {/* 2. Opening project statement */}
      <EditorialSection
        variant="text-only"
        eyebrow="About the project"
        heading="Why we document"
        body="CRAFTGUARD is a visual archive of the people, gestures and knowledge behind Kasuti and Ilkal. Through documentary photography and the words of makers, the project brings craft stories closer to audiences while creating a more direct, respectful path to considered buying. [Placeholder — final copy pending project owner approval.]"
      />

      {/* 3. Large horizontal documentary image */}
      <EditorialSection
        variant="full-bleed"
        image={`${PLACEHOLDER}documentary-wide-1.jpg`}
        imageAlt="Wide documentary shot of a weaving workshop with natural light"
        caption="A weaving workshop, early morning light. Photograph: Dhruti."
      />

      {/* 4. Introduction to Kasuti and Ilkal */}
      <EditorialSection
        variant="image-right"
        eyebrow="Two traditions"
        heading="Kasuti and Ilkal"
        body="Kasuti is a form of hand embroidery carried through pattern and memory. Ilkal is a handloom weaving tradition known for its distinct borders and pallus. Both are living practices, shaped daily by the artisans who carry them forward."
        image={`${PLACEHOLDER}kasuti-ilkal-intro.jpg`}
        imageAlt="Side by side texture of Kasuti embroidery and Ilkal weave"
      />

      {/* 5. Artisan portrait and quote */}
      <ArtisanFeature
        portrait={`${PLACEHOLDER}artisan-portrait-1.jpg`}
        quote="Every stitch carries what my mother taught me."
        name="Artisan name pending consent"
        location="Karnataka"
        craft="Kasuti embroidery"
        description="A short contextual description of this artisan's practice and history will appear here once consent documentation is finalized."
        consentApproved={false}
      />

      {/* 6. Craft teaser section */}
      <section className="px-5 md:px-8 my-20 md:my-32">
        <p className="eyebrow mb-4 text-center">Two living traditions</p>
        <h2 className="text-3xl md:text-4xl text-center mb-12">Begin the story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <CraftTeaser
            title="Kasuti"
            to="/kasuti"
            image={`${PLACEHOLDER}kasuti-teaser.jpg`}
            description="Stitch, fabric, tools, repetition and patient handwork."
          />
          <CraftTeaser
            title="Ilkal"
            to="/ilkal"
            image={`${PLACEHOLDER}ilkal-teaser.jpg`}
            description="Border, pallu, loom and a regional weaving identity."
          />
        </div>
      </section>

      {/* 7 & 8. Kasuti / Ilkal visual previews */}
      <EditorialSection
        variant="image-left"
        eyebrow="Kasuti · The Making"
        heading="Thread by thread"
        body="Geometric motifs built through counted stitches — a practice of precision, memory and repetition passed hand to hand."
        image={`${PLACEHOLDER}kasuti-process.jpg`}
        imageAlt="Close-up of Kasuti embroidery stitching in progress"
      />
      <EditorialSection
        variant="image-right"
        eyebrow="Ilkal · The Weave"
        heading="On the loom"
        body="Distinct borders and pallus woven using a technique unique to the Ilkal region, carried by generations of weaving families."
        image={`${PLACEHOLDER}ilkal-process.jpg`}
        imageAlt="Weaver's hands working an Ilkal saree on a traditional loom"
      />

      {/* Pull quote for pacing */}
      <PullQuote
        quote="These are not relics. They are living traditions, made today, by hands that know them best."
        attribution="CraftGuard"
      />

      {/* 9. Featured collection */}
      <section className="px-5 md:px-8 my-20 md:my-32">
        <div className="flex items-end justify-between mb-10 max-w-7xl mx-auto">
          <div>
            <p className="eyebrow mb-3">From the archive</p>
            <h2 className="text-3xl md:text-4xl">Featured pieces</h2>
          </div>
          <Link to="/gallery" className="text-sm uppercase tracking-wide border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors hidden md:block">
            View full gallery →
          </Link>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Will be wired to live /api/products?featured=true in Phase 3 */}
          <FeaturedPlaceholder />
          <FeaturedPlaceholder />
          <FeaturedPlaceholder />
        </div>
      </section>

      {/* 10. CRAFTGUARD project/about section */}
      <EditorialSection
        variant="text-only"
        eyebrow="About CraftGuard"
        heading="Documentation with consent, at its core"
        body="CraftGuard exists to give artisans visibility while protecting their consent and privacy — building a bridge between makers and audiences without flattening the craft into a catalogue."
      />
      <div className="text-center mb-20">
        <Link to="/about" className="text-sm uppercase tracking-wide border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors">
          Read the full story →
        </Link>
      </div>

      {/* 11. Quiet final call to action */}
      <section className="bg-charcoal text-cream py-24 px-5 md:px-8 text-center">
        <p className="eyebrow !text-cream/70 mb-4">Begin here</p>
        <h2 className="font-serif text-3xl md:text-5xl mb-8 max-w-2xl mx-auto">
          Step into the archive of Kasuti and Ilkal.
        </h2>
        <Link
          to="/gallery"
          className="inline-block bg-cream text-charcoal px-8 py-3 text-sm uppercase tracking-wide hover:bg-terracotta hover:text-cream transition-colors"
        >
          Enter the Gallery
        </Link>
      </section>
    </>
  );
}

function FeaturedPlaceholder() {
  return (
    <div className="border border-line p-3">
      <div className="aspect-[4/5] bg-line/60 mb-3" aria-hidden="true" />
      <p className="eyebrow mb-1">Kasuti</p>
      <p className="font-serif text-lg">Product name pending</p>
    </div>
  );
}