export default function StoryIntro({ eyebrow, title, subtitle }) {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 md:px-8 py-24">
      <p className="eyebrow mb-6" data-aos="fade-up">{eyebrow}</p>
      <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.05] max-w-4xl mb-6" data-aos="fade-up" data-aos-delay="100">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base md:text-lg text-mute max-w-xl" data-aos="fade-up" data-aos-delay="200">
          {subtitle}
        </p>
      )}
      <span className="mt-12 text-2xl text-mute animate-bounce motion-reduce:animate-none" aria-hidden="true">↓</span>
    </section>
  );
}