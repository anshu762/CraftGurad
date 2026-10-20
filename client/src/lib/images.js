/**
 * Central image registry.
 * Place real photo files at the exact paths below (inside client/public/).
 * If a file is missing or fails to load, ResponsiveImage shows a themed
 * placeholder automatically — the site never breaks from a missing image.
 */
export const IMAGES = {
  // ---------- Homepage ----------
  heroMain: { src: '/images/home/hero-main.webp', alt: "A Kasuti artisan's hands mid-stitch on red cotton fabric, workshop light", theme: 'kasuti', label: 'Hero photograph pending' },
  documentaryWide1: { src: '/images/home/documentary-wide-1.webp', alt: 'Wide documentary shot of a weaving workshop with natural light', theme: 'ilkal', label: 'Documentary photograph pending' },
  kasutiIlkalIntro: { src: '/images/home/kasuti-ilkal-intro.webp', alt: 'Side by side texture of Kasuti embroidery and Ilkal weave', theme: 'neutral', label: 'Texture photograph pending' },
  artisanPortrait1: { src: '/images/home/artisan-portrait-1.webp', alt: 'Artisan at work, portrait withheld pending consent', theme: 'kasuti', label: 'Portrait pending consent + photography' },
  kasutiTeaser: { src: '/images/home/kasuti-teaser.jpeg', alt: 'Kasuti embroidery craft preview', theme: 'kasuti', label: 'Kasuti — photograph pending' },
  ilkalTeaser: { src: '/images/home/ilkal-teaser.jpeg', alt: 'Ilkal weaving craft preview', theme: 'ilkal', label: 'Ilkal — photograph pending' },
  kasutiProcess: { src: '/images/home/kasuti-process.jpeg', alt: 'Close-up of Kasuti embroidery stitching in progress', theme: 'kasuti', label: 'Process photograph pending' },
  ilkalProcess: { src: '/images/home/ilkal-process.jpeg', alt: "Weaver's hands working an Ilkal saree on a traditional loom", theme: 'ilkal', label: 'Process photograph pending' },

  // ---------- Kasuti story page ----------
  kasutiOpening: { src: '/images/kasuti/opening.webp', alt: 'Kasuti work in progress on handwoven cotton', theme: 'kasuti', label: 'Opening photograph pending' },
  kasutiOrigin: { src: '/images/kasuti/origin.jpeg', alt: 'Traditional Kasuti motifs on fabric', theme: 'kasuti', label: 'Origin photograph pending' },
  kasutiMaking1: { src: '/images/kasuti/making-1.jpeg', alt: 'Close-up of Kasuti stitching technique, side one', theme: 'kasuti', label: 'Process photograph pending', caption: 'Counting threads before each stitch.' },
  kasutiMaking2: { src: '/images/kasuti/making-2.webp', alt: 'Close-up of Kasuti stitching technique, side two', theme: 'kasuti', label: 'Process photograph pending', caption: 'A completed motif section.' },
  kasutiMaterials: { src: '/images/kasuti/materials.webp', alt: 'Silk and cotton threads used in Kasuti embroidery', theme: 'kasuti', label: 'Materials photograph pending' },
  kasutiArtisan: { src: '/images/kasuti/artisan.webp', alt: 'Kasuti artisan portrait, withheld pending consent', theme: 'kasuti', label: 'Portrait pending consent' },
  kasutiChallenge: { src: '/images/kasuti/challenge.webp', alt: 'Kasuti artisan working in natural daylight', theme: 'kasuti', label: 'Context photograph pending' },
  kasutiCollection: { src: '/images/kasuti/collection.webp', alt: 'Finished Kasuti pieces laid out for documentation', theme: 'kasuti', label: 'Collection photograph pending' },
  kasutiClosing: { src: '/images/kasuti/closing.webp', alt: 'A finished Kasuti motif close-up', theme: 'kasuti', label: 'Closing photograph pending' },

  // ---------- Ilkal story page ----------
  ilkalOpening: { src: '/images/ilkal/opening.webp', alt: 'An Ilkal saree on the loom, mid-weave', theme: 'ilkal', label: 'Opening photograph pending' },
  ilkalOrigin: { src: '/images/ilkal/origin.webp', alt: 'Pit loom used in Ilkal weaving', theme: 'ilkal', label: 'Origin photograph pending' },
  ilkalMaking1: { src: '/images/ilkal/making-1.webp', alt: 'Weaver threading the loom, step one', theme: 'ilkal', label: 'Process photograph pending', caption: 'Preparing the separate pallu warp.' },
  ilkalMaking2: { src: '/images/ilkal/making-2.webp', alt: 'Weaver threading the loom, step two', theme: 'ilkal', label: 'Process photograph pending', caption: 'Joining pallu to the saree body.' },
  ilkalMaterials: { src: '/images/ilkal/materials.webp', alt: 'Ilkal saree border and pallu detail', theme: 'ilkal', label: 'Materials photograph pending' },
  ilkalArtisan: { src: '/images/ilkal/artisan.webp', alt: 'Ilkal weaver portrait, withheld pending consent', theme: 'ilkal', label: 'Portrait pending consent' },
  ilkalChallenge: { src: '/images/ilkal/challenge.webp', alt: 'Ilkal weaving workshop, family-run loom setting', theme: 'ilkal', label: 'Context photograph pending' },
  ilkalCollection: { src: '/images/ilkal/collection.webp', alt: 'Finished Ilkal sarees laid out for documentation', theme: 'ilkal', label: 'Collection photograph pending' },
  ilkalClosing: { src: '/images/ilkal/closing.webp', alt: 'A finished Ilkal pallu close-up', theme: 'ilkal', label: 'Closing photograph pending' },

  // ---------- About page ----------
  aboutDocumentary: { src: '/images/about/documentary.webp', alt: 'Documentary photography session in a Karnataka workshop', theme: 'neutral', label: 'Documentary photograph pending' },
  aboutDhruti: { src: '/images/about/dhruti.webp', alt: "Dhruti photographing an artisan's workspace", theme: 'neutral', label: 'Photographer photograph pending' },
  aboutConsent: { src: '/images/about/consent.webp', alt: 'Artisan reviewing a consent document', theme: 'neutral', label: 'Consent process photograph pending' },
};