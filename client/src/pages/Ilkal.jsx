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

export default function Ilkal() {
  useDocumentTitle(
    'Ilkal — A Regional Handloom Weaving Tradition',
    'Explore the origin, weaving process, materials and weaving communities behind Ilkal sarees, documented by CraftGuard.'
  );

  return (
    <>
      <StoryProgress />

      <StoryIntro
        eyebrow="Craft Story · Karnataka"
        title="Ilkal"
        subtitle="A regional handloom tradition known for its distinctive borders, pallus and weaving communities."
      />

      <EditorialSection
        variant="full-bleed"
        image={IMAGES.ilkalOpening}
        caption="An Ilkal saree on the loom, mid-weave. Photograph credit pending."
      />

      <StorySection
        number="01"
        label="Origin"
        heading="Named for a town, carried by a community"
        body="Ilkal sarees take their name from the town of Ilkal in Karnataka, where the weaving tradition has been practiced for centuries by local weaving communities. Woven on pit looms, each saree reflects a regional identity shaped by locally available cotton and silk, and by techniques refined across generations of family workshops."
        image={IMAGES.ilkalOrigin}
        variant="image-right"
      />

      <ProcessGallery
        eyebrow="02 — The Weave"
        heading="On the pit loom"
        body='Ilkal weaving uses a distinctive technique called "tope teni," where the pallu is woven separately using a different warp and then joined to the body of the saree — a technique that gives Ilkal sarees their recognizable, sharply contrasting pallu.'
        images={[IMAGES.ilkalMaking1, IMAGES.ilkalMaking2]}
      />

      <StorySection
        number="03"
        label="Border & Pallu"
        heading="A signature silhouette"
        body="Ilkal sarees are known for their broad, contrast-color borders and richly patterned pallus, often finished with a temple-tower (gopura) motif. Red, maroon and chikki (parrot green) are traditional pallu colors, set against bodies woven in cotton, silk, or a cotton-silk blend."
        image={IMAGES.ilkalMaterials}
        variant="image-left"
      />

      <ArtisanFeature
        portrait={IMAGES.ilkalArtisan}
        quote="The loom has been in our family for three generations."
        name="Weaver name pending consent"
        location="Ilkal, Karnataka"
        craft="Ilkal weaving"
        description="A short contextual description of this weaver's family workshop, training and relationship to the craft will appear here once consent documentation is finalized with the project team."
        consentApproved={false}
      />

      <PullQuote
        quote="A finished Ilkal saree carries the rhythm of the loom and the patience of the weaver's hands."
        attribution="An Ilkal weaver, Karnataka"
      />

      <StorySection
        number="04"
        label="The Challenge"
        heading="Working context and market barriers"
        body="Powerloom imitations, fluctuating raw material costs and limited direct buyer access put pressure on handloom Ilkal weaving communities. Many weaving families continue the practice out of inherited commitment even as market conditions make it increasingly difficult to sustain — a tension CraftGuard documents rather than resolves."
        image={IMAGES.ilkalChallenge}
        variant="image-right"
      />

      <CollectionTransition craft="ilkal" craftLabel="Ilkal" image={IMAGES.ilkalCollection} />

      <RelatedProductsPreview craftLabel="Ilkal" />

      <EditorialSection
        variant="full-bleed"
        image={IMAGES.ilkalClosing}
        caption="A finished Ilkal pallu, woven thread by thread on a family loom."
      />

      <StoryNavigation currentCraft="ilkal" />
    </>
  );
}