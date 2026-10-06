export default function PullQuote({ quote, attribution }) {
  return (
    <section className="my-20 md:my-32 px-5 md:px-8">
      <blockquote 
        className="max-w-5xl mx-auto text-center relative"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        {/* Decorative quotes */}
        <div className="absolute -top-8 -left-8 text-8xl text-terracotta/20 font-serif">"</div>
        
        {/* Quote text */}
        <p className="font-serif italic text-4xl md:text-6xl lg:text-7xl leading-tight text-charcoal relative z-10">
          {quote}
        </p>
        
        {/* Attribution */}
        {attribution && (
          <cite className="block mt-10 eyebrow not-italic !text-terracotta tracking-widest">
            {attribution}
          </cite>
        )}

        {/* Decorative line */}
        <div className="w-24 h-0.5 bg-terracotta mx-auto mt-10" />
      </blockquote>
    </section>
  );
}