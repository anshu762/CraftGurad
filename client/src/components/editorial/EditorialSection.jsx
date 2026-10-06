/**
 * Flexible section supporting the "editorial rhythm" the spec requires:
 * variants: 'image-left' | 'image-right' | 'full-bleed' | 'text-only'
 */
export default function EditorialSection({
  eyebrow,
  heading,
  body,
  image,
  imageAlt,
  variant = 'image-right',
  caption,
}) {
  if (variant === 'full-bleed') {
    return (
      <section className="my-20 md:my-32">
        <figure data-aos="fade-up">
          <img src={image} alt={imageAlt} className="w-full h-[55vh] md:h-[80vh] object-cover" loading="lazy" />
          {caption && <figcaption className="text-xs text-mute mt-3 px-5 md:px-8">{caption}</figcaption>}
        </figure>
      </section>
    );
  }

  if (variant === 'text-only') {
    return (
      <section className="my-20 md:my-32 px-5 md:px-8">
        <div className="max-w-prose mx-auto" data-aos="fade-up">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          {heading && <h2 className="text-3xl md:text-4xl mb-6">{heading}</h2>}
          {body && <p className="text-base md:text-lg leading-relaxed text-charcoal/90">{body}</p>}
        </div>
      </section>
    );
  }

  const imageFirst = variant === 'image-left';

  return (
    <section className="my-20 md:my-32 px-5 md:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div
          className={`${imageFirst ? 'md:order-1' : 'md:order-2'}`}
          data-aos={imageFirst ? 'fade-right' : 'fade-left'}
        >
          <img src={image} alt={imageAlt} className="w-full h-[50vh] md:h-[70vh] object-cover" loading="lazy" />
          {caption && <p className="text-xs text-mute mt-3">{caption}</p>}
        </div>
        <div className={`${imageFirst ? 'md:order-2' : 'md:order-1'}`} data-aos="fade-up">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          {heading && <h2 className="text-3xl md:text-4xl mb-6">{heading}</h2>}
          {body && <p className="text-base md:text-lg leading-relaxed text-charcoal/90">{body}</p>}
        </div>
      </div>
    </section>
  );
}