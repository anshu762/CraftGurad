import { Link } from 'react-router-dom';
import StoryIntro from '../components/editorial/StoryIntro.jsx';
import EditorialSection from '../components/editorial/EditorialSection.jsx';
import PullQuote from '../components/editorial/PullQuote.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { IMAGES } from '../utils/images.js';

export default function About() {
  useDocumentTitle(
    "About CraftGuard",
    "Learn about CraftGuard's mission, Dhruti's documentary photography, and our consent-first approach to craft storytelling."
  );

  return (
    <>
      <StoryIntro
        eyebrow="About the Project"
        title="CraftGuard"
        subtitle="A documentary archive of Kasuti and Ilkal, built with consent, care and craft at its center."
      />

      <EditorialSection
        variant="text-only"
        eyebrow="Our purpose"
        heading="Why this archive exists"
        body="CraftGuard was created to document the people, gestures and knowledge behind Kasuti and Ilkal before they are flattened into a product catalogue. The project combines documentary photography with the words of makers themselves, aiming to bring these traditions closer to audiences while opening a more direct, respectful path to market access."
      />

      <EditorialSection
        variant="full-bleed"
        image={IMAGES.aboutDocumentary}
        caption="Documenting a workshop in Karnataka. Photograph credit pending."
      />

      <EditorialSection
        variant="image-right"
        eyebrow="The photographer"
        heading="Dhruti's documentary practice"
        body="Dhruti's photography forms the visual foundation of CraftGuard — long-form, patient documentation of workshops, hands, tools and the rhythms of making. Rather than staged product photography, the approach favors observational images that respect the subject's time and context."
        image={IMAGES.aboutDhruti}
      />

      <EditorialSection
        variant="image-left"
        eyebrow="Our approach"
        heading="Consent before documentation"
        body="Every portrait, quote, name and location published on CraftGuard is backed by a structured consent record. Artisans control what is shared about them — nothing identifying is published without their explicit, recorded permission. Visibility is offered, never assumed."
        image={IMAGES.aboutConsent}
      />

      <PullQuote
        quote="Documentation without consent isn't preservation — it's extraction. We chose the harder, slower path."
        attribution="CraftGuard project team"
      />

      <EditorialSection
        variant="text-only"
        eyebrow="Looking ahead"
        heading="A growing archive"
        body="CraftGuard will continue to expand — more artisans, more documented process, and a considered approach to market access that treats craft as a living, evolving practice rather than a fixed historical artifact."
      />

      <section className="bg-charcoal text-cream py-24 px-5 md:px-8 text-center">
        <p className="eyebrow !text-cream/70 mb-4">Get in touch</p>
        <h2 className="font-serif text-3xl md:text-5xl mb-8 max-w-2xl mx-auto">
          Questions about the project, consent, or collaboration?
        </h2>
        <Link
          to="/contact"
          className="inline-block bg-cream text-charcoal px-8 py-3 text-sm uppercase tracking-wide hover:bg-terracotta hover:text-cream transition-colors"
        >
          Contact CraftGuard
        </Link>
      </section>
    </>
  );
}