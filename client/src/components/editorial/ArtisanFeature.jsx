export default function ArtisanFeature({ 
  portrait, 
  quote, 
  name, 
  location, 
  craft, 
  description, 
  consentApproved,
  index = 0,
}) {
  const showIdentity = consentApproved;

  return (
    <section className="my-20 md:my-32 px-5 md:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Portrait */}
        <div 
          data-aos="fade-right"
          data-aos-duration="1200"
          data-aos-delay={index * 100}
        >
          <div className="overflow-hidden relative">
            <img
              src={portrait}
              alt={showIdentity ? `Portrait of ${name}, ${craft} artisan from ${location}` : 'Artisan at work'}
              className="w-full h-[65vh] md:h-[80vh] object-cover transform hover:scale-105 transition-transform duration-1000"
              loading="lazy"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-terracotta/0 hover:bg-terracotta/5 transition-colors duration-700" />
          </div>
        </div>

        {/* Content */}
        <div 
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay={index * 100 + 200}
        >
          {/* Eyebrow */}
          <p className="eyebrow mb-6 !text-terracotta tracking-widest">
            The Maker
          </p>

          {/* Quote */}
          {quote && (
            <blockquote className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-snug mb-8 text-charcoal">
              <span className="text-terracotta text-6xl mr-2">"</span>
              {quote}
              <span className="text-terracotta text-6xl ml-2">"</span>
            </blockquote>
          )}

          {/* Identity */}
          {showIdentity ? (
            <>
              <p className="text-2xl md:text-3xl font-medium mb-2">{name}</p>
              <p className="text-sm text-mute mb-6 tracking-widest uppercase">
                {location} · {craft}
              </p>
            </>
          ) : (
            <p className="text-sm text-mute mb-6 tracking-wide">
              Identity withheld pending consent confirmation.
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="text-lg leading-relaxed text-charcoal/80 font-light">
              {description}
            </p>
          )}

          {/* Decorative element */}
          <div className="w-16 h-0.5 bg-terracotta mt-8" />
        </div>
      </div>
    </section>
  );
}





















// export default function ArtisanFeature({ portrait, quote, name, location, craft, description, consentApproved }) {
//   // Progressive disclosure + consent gate: never show identity data without approval
//   const showIdentity = consentApproved;

//   return (
//     <section className="my-20 md:my-32 px-5 md:px-8">
//       <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//         <div data-aos="fade-right">
//           <img
//             src={portrait}
//             alt={showIdentity ? `Portrait of ${name}, ${craft} artisan from ${location}` : 'Artisan at work, portrait withheld pending consent'}
//             className="w-full h-[60vh] object-cover"
//             loading="lazy"
//           />
//         </div>
//         <div data-aos="fade-up">
//           <p className="eyebrow mb-4">The Maker</p>
//           {quote && <blockquote className="font-serif italic text-2xl md:text-3xl leading-snug mb-6">“{quote}”</blockquote>}
//           {showIdentity ? (
//             <>
//               <p className="text-lg font-medium">{name}</p>
//               <p className="text-sm text-mute mb-4">{location} · {craft}</p>
//             </>
//           ) : (
//             <p className="text-sm text-mute mb-4">Identity withheld pending consent confirmation.</p>
//           )}
//           {description && <p className="text-base leading-relaxed text-charcoal/90">{description}</p>}
//         </div>
//       </div>
//     </section>
//   );
// }