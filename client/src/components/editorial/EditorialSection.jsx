/**
 * Enhanced EditorialSection with better animations and layout options
 * variants: 'image-left' | 'image-right' | 'full-bleed' | 'text-only' | 'split'
 */
export default function EditorialSection({
  eyebrow,
  heading,
  body,
  image,
  imageAlt,
  variant = 'image-right',
  caption,
  className = '',
  reverse = false,
}) {
  // Full bleed variant
  if (variant === 'full-bleed') {
    return (
      <section className={`my-20 md:my-32 ${className}`}>
        <figure 
          className="relative"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <div className="overflow-hidden">
            <img 
              src={image} 
              alt={imageAlt} 
              className="w-full h-[60vh] md:h-[85vh] object-cover transform hover:scale-105 transition-transform duration-1000" 
              loading="lazy" 
            />
          </div>
          {caption && (
            <figcaption className="text-xs text-mute mt-4 px-5 md:px-8 tracking-wide">
              {caption}
            </figcaption>
          )}
        </figure>
      </section>
    );
  }

  // Text only variant
  if (variant === 'text-only') {
    return (
      <section className={`my-20 md:my-32 px-5 md:px-8 ${className}`}>
        <div 
          className="max-w-prose mx-auto text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {eyebrow && (
            <p className="eyebrow mb-4 !text-terracotta tracking-widest">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 font-serif leading-tight">
              {heading}
            </h2>
          )}
          {body && (
            <p className="text-lg md:text-xl leading-relaxed text-charcoal/80 font-light">
              {body}
            </p>
          )}
        </div>
      </section>
    );
  }

  // Split layout
  const imageFirst = variant === 'image-left' || (!reverse && variant !== 'image-right');

  return (
    <section className={`my-20 md:my-32 px-5 md:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image */}
        <div
          className={`${imageFirst ? 'md:order-1' : 'md:order-2'}`}
          data-aos={imageFirst ? 'fade-right' : 'fade-left'}
          data-aos-duration="1200"
        >
          <div className="overflow-hidden relative group">
            <img 
              src={image} 
              alt={imageAlt} 
              className="w-full h-[55vh] md:h-[75vh] object-cover transform group-hover:scale-105 transition-transform duration-1000" 
              loading="lazy" 
            />
            <div className="absolute inset-0 bg-terracotta/0 group-hover:bg-terracotta/10 transition-colors duration-700" />
          </div>
          {caption && (
            <p className="text-xs text-mute mt-4 tracking-wide">{caption}</p>
          )}
        </div>

        {/* Content */}
        <div 
          className={`${imageFirst ? 'md:order-2' : 'md:order-1'}`}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {eyebrow && (
            <p className="eyebrow mb-4 !text-terracotta tracking-widest">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-4xl md:text-5xl mb-8 font-serif leading-tight">
              {heading}
            </h2>
          )}
          {body && (
            <p className="text-lg md:text-xl leading-relaxed text-charcoal/80 font-light">
              {body}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}






















// /**
//  * Flexible section supporting the "editorial rhythm" the spec requires:
//  * variants: 'image-left' | 'image-right' | 'full-bleed' | 'text-only'
//  */
// export default function EditorialSection({
//   eyebrow,
//   heading,
//   body,
//   image,
//   imageAlt,
//   variant = 'image-right',
//   caption,
// }) {
//   if (variant === 'full-bleed') {
//     return (
//       <section className="my-20 md:my-32">
//         <figure data-aos="fade-up">
//           <img src={image} alt={imageAlt} className="w-full h-[55vh] md:h-[80vh] object-cover" loading="lazy" />
//           {caption && <figcaption className="text-xs text-mute mt-3 px-5 md:px-8">{caption}</figcaption>}
//         </figure>
//       </section>
//     );
//   }

//   if (variant === 'text-only') {
//     return (
//       <section className="my-20 md:my-32 px-5 md:px-8">
//         <div className="max-w-prose mx-auto" data-aos="fade-up">
//           {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
//           {heading && <h2 className="text-3xl md:text-4xl mb-6">{heading}</h2>}
//           {body && <p className="text-base md:text-lg leading-relaxed text-charcoal/90">{body}</p>}
//         </div>
//       </section>
//     );
//   }

//   const imageFirst = variant === 'image-left';

//   return (
//     <section className="my-20 md:my-32 px-5 md:px-8">
//       <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
//         <div
//           className={`${imageFirst ? 'md:order-1' : 'md:order-2'}`}
//           data-aos={imageFirst ? 'fade-right' : 'fade-left'}
//         >
//           <img src={image} alt={imageAlt} className="w-full h-[50vh] md:h-[70vh] object-cover" loading="lazy" />
//           {caption && <p className="text-xs text-mute mt-3">{caption}</p>}
//         </div>
//         <div className={`${imageFirst ? 'md:order-2' : 'md:order-1'}`} data-aos="fade-up">
//           {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
//           {heading && <h2 className="text-3xl md:text-4xl mb-6">{heading}</h2>}
//           {body && <p className="text-base md:text-lg leading-relaxed text-charcoal/90">{body}</p>}
//         </div>
//       </div>
//     </section>
//   );
// }