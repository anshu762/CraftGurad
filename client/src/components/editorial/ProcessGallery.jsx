import ResponsiveImage from '../media/ResponsiveImage.jsx';

/** Two-image process layout per spec §4.5 editorial rhythm variation. */
export default function ProcessGallery({ eyebrow, heading, body, images = [] }) {
  return (
    <section className="my-20 md:my-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-prose mb-10" data-aos="fade-up">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          {heading && <h2 className="text-3xl md:text-4xl mb-6">{heading}</h2>}
          {body && <p className="text-base md:text-lg leading-relaxed text-charcoal/90">{body}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {images.map((img, i) => (
            <figure key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <ResponsiveImage src={img.src} alt={img.alt} theme={img.theme} label={img.label} aspect="4/5" />
              {img.caption && <figcaption className="text-xs text-mute mt-3">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}