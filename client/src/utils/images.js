/**
 * Central image registry.
 * To add a real photo: drop the file into client/public/images/ and set `src`.
 * No other code changes needed — every page updates automatically.
 */
export const IMAGES = {
  // --- Homepage (unchanged from previous phase) ---
  heroMain: { src: null, alt: "A Kasuti artisan's hands mid-stitch on red cotton fabric, workshop light", theme: 'kasuti', label: 'Hero photograph pending' },
  documentaryWide1: { src: null, alt: 'Wide documentary shot of a weaving workshop with natural light', theme: 'ilkal', label: 'Documentary photograph pending' },
  kasutiIlkalIntro: { src: null, alt: 'Side by side texture of Kasuti embroidery and Ilkal weave', theme: 'neutral', label: 'Texture photograph pending' },
  artisanPortrait1: { src: null, alt: 'Artisan at work, portrait withheld pending consent', theme: 'kasuti', label: 'Portrait pending consent + photography' },
  kasutiTeaser: { src: null, alt: 'Kasuti embroidery craft preview', theme: 'kasuti', label: 'Kasuti — photograph pending' },
  ilkalTeaser: { src: null, alt: 'Ilkal weaving craft preview', theme: 'ilkal', label: 'Ilkal — photograph pending' },
  kasutiProcess: { src: null, alt: 'Close-up of Kasuti embroidery stitching in progress', theme: 'kasuti', label: 'Process photograph pending' },
  ilkalProcess: { src: null, alt: "Weaver's hands working an Ilkal saree on a traditional loom", theme: 'ilkal', label: 'Process photograph pending' },

  // --- Kasuti story page (new) ---
  kasutiOpening: { src: null, alt: 'Kasuti work in progress on handwoven cotton', theme: 'kasuti', label: 'Opening photograph pending' },
  kasutiOrigin: { src: null, alt: 'Traditional Kasuti motifs on fabric', theme: 'kasuti', label: 'Origin photograph pending' },
  kasutiMaking1: { src: null, alt: 'Close-up of Kasuti stitching technique, side one', theme: 'kasuti', label: 'Process photograph pending', caption: 'Counting threads before each stitch.' },
  kasutiMaking2: { src: null, alt: 'Close-up of Kasuti stitching technique, side two', theme: 'kasuti', label: 'Process photograph pending', caption: 'A completed motif section.' },
  kasutiMaterials: { src: null, alt: 'Silk and cotton threads used in Kasuti embroidery', theme: 'kasuti', label: 'Materials photograph pending' },
  kasutiArtisan: { src: null, alt: 'Kasuti artisan portrait, withheld pending consent', theme: 'kasuti', label: 'Portrait pending consent' },
  kasutiChallenge: { src: null, alt: 'Kasuti artisan working in natural daylight', theme: 'kasuti', label: 'Context photograph pending' },
  kasutiCollection: { src: null, alt: 'Finished Kasuti pieces laid out for documentation', theme: 'kasuti', label: 'Collection photograph pending' },
  kasutiClosing: { src: null, alt: 'A finished Kasuti motif close-up', theme: 'kasuti', label: 'Closing photograph pending' },

  // --- Ilkal story page (new) ---
  ilkalOpening: { src: null, alt: 'An Ilkal saree on the loom, mid-weave', theme: 'ilkal', label: 'Opening photograph pending' },
  ilkalOrigin: { src: null, alt: 'Pit loom used in Ilkal weaving', theme: 'ilkal', label: 'Origin photograph pending' },
  ilkalMaking1: { src: null, alt: 'Weaver threading the loom, step one', theme: 'ilkal', label: 'Process photograph pending', caption: 'Preparing the separate pallu warp.' },
  ilkalMaking2: { src: null, alt: 'Weaver threading the loom, step two', theme: 'ilkal', label: 'Process photograph pending', caption: 'Joining pallu to the saree body.' },
  ilkalMaterials: { src: null, alt: 'Ilkal saree border and pallu detail', theme: 'ilkal', label: 'Materials photograph pending' },
  ilkalArtisan: { src: null, alt: 'Ilkal weaver portrait, withheld pending consent', theme: 'ilkal', label: 'Portrait pending consent' },
  ilkalChallenge: { src: null, alt: 'Ilkal weaving workshop, family-run loom setting', theme: 'ilkal', label: 'Context photograph pending' },
  ilkalCollection: { src: null, alt: 'Finished Ilkal sarees laid out for documentation', theme: 'ilkal', label: 'Collection photograph pending' },
  ilkalClosing: { src: null, alt: 'A finished Ilkal pallu close-up', theme: 'ilkal', label: 'Closing photograph pending' },

  // --- About page (new) ---
  aboutDocumentary: { src: null, alt: 'Documentary photography session in a Karnataka workshop', theme: 'neutral', label: 'Documentary photograph pending' },
  aboutDhruti: { src: null, alt: "Dhruti photographing an artisan's workspace", theme: 'neutral', label: 'Photographer photograph pending' },
  aboutConsent: { src: null, alt: 'Artisan reviewing a consent document', theme: 'neutral', label: 'Consent process photograph pending' },
};