import StoryIntro from '../components/editorial/StoryIntro.jsx';
import EditorialSection from '../components/editorial/EditorialSection.jsx';
import StorySection from '../components/editorial/StorySection.jsx';
import ProcessGallery from '../components/editorial/ProcessGallery.jsx';
import ArtisanFeature from '../components/editorial/ArtisanFeature.jsx';
import PullQuote from '../components/editorial/PullQuote.jsx';
import CollectionTransition from '../components/editorial/CollectionTransition.jsx';
import RelatedProductsPreview from '../components/editorial/RelatedProductsPreview.jsx';
import StoryNavigation from '../components/editorial/StoryNavigation.jsx';
import StoryProgress from '../components/editorial/StoryProgress.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { IMAGES } from '../utils/images.js';

export default function Kasuti() {
  useDocumentTitle(
    'Kasuti — A Living Embroidery Tradition',
    'Explore the origin, making process, materials and makers behind Kasuti embroidery, documented by CraftGuard.'
  );

  return (
    <>
      <StoryProgress />

      <StoryIntro
        eyebrow="Craft Story · Karnataka"
        title="Kasuti"
        subtitle="A living embroidery tradition carried through pattern, memory and labour."
      />

      <EditorialSection
        variant="full-bleed"
        image={IMAGES.kasutiOpening}
        caption="Kasuti work in progress on handwoven cotton. Photograph credit pending."
      />

      <StorySection
        number="01"
        label="Origin"
        heading="A tradition rooted in everyday life"
        body="Kasuti embroidery originates from the Karnataka region, traditionally stitched onto garments marking everyday life and ceremony. Its geometric motifs — temple towers, palanquins, lamps and chariots — carry meaning passed through generations of women who practiced it as part of domestic life before it entered wider markets."
        image={IMAGES.kasutiOrigin}
        variant="image-right"
      />

      <ProcessGallery
        eyebrow="02 — The Making"
        heading="Stitch, fabric, tools, repetition"
        body="Kasuti is worked without knots on either side of the fabric, requiring the embroiderer to count threads precisely as they move. Four traditional stitches — Gavanti, Murgi, Neyge and Menthe — combine to build each motif, often taking days or weeks per piece."
        images={[IMAGES.kasutiMaking1, IMAGES.kasutiMaking2]}
      />

      <StorySection
        number="03"
        label="Materials & Motifs"
        heading="Thread, cloth and symbol"
        body="Traditionally worked in silk or cotton thread on handwoven fabric, Kasuti motifs draw from architecture, nature and ritual — gopuras, palanquins, lotuses and chariots repeat across generations of work, each artisan carrying subtle variations of the same inherited vocabulary."
        image={IMAGES.kasutiMaterials}
        variant="image-left"
      />

      <ArtisanFeature
        portrait={IMAGES.kasutiArtisan}
        quote="Every stitch carries what my mother taught me."
        name="Artisan name pending consent"
        location="Karnataka"
        craft="Kasuti embroidery"
        description="A short contextual description of this artisan's practice, training and relationship to the craft will appear here once consent documentation is finalized with the project team."
        consentApproved={false}
      />

      <PullQuote
        quote="We don't just stitch patterns. We stitch what was taught to us, so it isn't forgotten."
        attribution="A Kasuti artisan, Karnataka"
      />

      <StorySection
        number="04"
        label="The Challenge"
        heading="Visibility, pricing and market access"
        body="Despite the skill and time Kasuti demands, artisans often remain disconnected from buyers who would value their work fairly. Limited visibility, inconsistent pricing and a lack of direct market access remain persistent barriers — challenges CraftGuard aims to document honestly, not simply resolve with a storefront."
        image={IMAGES.kasutiChallenge}
        variant="image-right"
      />

      <CollectionTransition craft="kasuti" craftLabel="Kasuti" image={IMAGES.kasutiCollection} />

      {/* <RelatedProductsPreview craftLabel="Kasuti" /> */}

      <EditorialSection
        variant="full-bleed"
        image={IMAGES.kasutiClosing}
        caption="A finished Kasuti motif, ready for the next hand to carry the tradition forward."
      />

      <StoryNavigation currentCraft="kasuti" />
    </>
  );
}