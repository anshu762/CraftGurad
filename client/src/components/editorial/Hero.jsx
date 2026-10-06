import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Hero({
  image,
  alt,
  eyebrow,
  title,
  subtitle,
  primaryActions = [],
  secondaryAction,
}) {
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setLoaded(true);
    
    const handleScroll = () => {
      const progress = window.scrollY / window.innerHeight;
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative h-screen w-full overflow-hidden" 
      aria-label={alt}
    >
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollProgress * 20}%)`,
        }}
      >
        <img
          src={image}
          alt={alt}
          className={`w-full h-full object-cover transition-transform duration-100 ${
            loaded ? 'scale-105' : 'scale-100'
          }`}
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
        <div className="absolute inset-0 bg-charcoal/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-5 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          {eyebrow && (
            <p 
              className="eyebrow !text-cream/80 mb-4 tracking-widest"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              {eyebrow}
            </p>
          )}

          {/* Title */}
          <h1
            className="text-cream font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.95] mb-6"
            data-aos="fade-up"
            data-aos-delay="150"
            data-aos-duration="1200"
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p 
              className="text-cream/90 text-lg md:text-xl lg:text-2xl max-w-2xl mb-10 font-light"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              {subtitle}
            </p>
          )}

          {/* Actions */}
          <div 
            className="flex flex-wrap items-center gap-4"
            data-aos="fade-up"
            data-aos-delay="450"
            data-aos-duration="1000"
          >
            {primaryActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="group relative bg-cream rounded-xl px-4 py-4 text-sm tracking-widest uppercase font-medium overflow-hidden transition-all hover:px-10 hover:text-white"
              >
                <span className="relative z-10">{action.label}</span>
                <div className="absolute inset-0 bg-terracotta transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <span className="absolute inset-0 flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-500 ">
                  {action.label}
                </span>
              </Link>
            ))}

            {secondaryAction && (
              <Link
                to={secondaryAction.href}
                className="group flex items-center gap-3 text-cream border-b border-cream/60 pb-2 text-sm tracking-widest uppercase hover:border-terracotta hover:text-terracotta transition-all duration-500"
              >
                {secondaryAction.label}
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        data-aos="fade-up"
        data-aos-delay="800"
        data-aos-duration="1000"
      >
        <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cream/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-cream/10">
        <div 
          className="h-full bg-terracotta transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </section>
  );
}
























// export default function Hero({
//   image,
//   alt,
//   eyebrow,
//   title,
//   subtitle,
//   primaryActions = [],
//   secondaryAction,
// }) {
//   return (
//     <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden" aria-label={alt}>
//       <img
//         src={image}
//         alt={alt}
//         className="absolute inset-0 w-full h-full object-cover"
//         loading="eager"
//         fetchpriority="high"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
//       <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-12 pb-16 md:pb-24 max-w-5xl">
//         {eyebrow && <p className="eyebrow !text-cream/80 mb-4" data-aos="fade-up">{eyebrow}</p>}
//         <h1
//           className="text-cream font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-5"
//           data-aos="fade-up"
//           data-aos-delay="100"
//         >
//           {title}
//         </h1>
//         {subtitle && (
//           <p className="text-cream/90 text-base md:text-lg max-w-xl mb-8" data-aos="fade-up" data-aos-delay="200">
//             {subtitle}
//           </p>
//         )}
//         <div className="flex flex-wrap items-center gap-4" data-aos="fade-up" data-aos-delay="300">
//           {primaryActions.map((a) => (
//             <a
//               key={a.href}
//               href={a.href}
//               className="bg-cream text-charcoal px-6 py-3 text-sm tracking-wide uppercase font-medium hover:bg-terracotta hover:text-cream transition-colors rounded-sm"
//             >
//               {a.label}
//             </a>
//           ))}
//           {secondaryAction && (
//             <a
//               href={secondaryAction.href}
//               className="text-cream border-b border-cream/60 pb-1 text-sm tracking-wide uppercase hover:border-terracotta hover:text-terracotta transition-colors"
//             >
//               {secondaryAction.label}
//             </a>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }