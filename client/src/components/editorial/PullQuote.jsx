export default function PullQuote({ quote, attribution }) {
  return (
    <section className="my-20 md:my-32 px-5 md:px-8">
      <blockquote className="max-w-4xl mx-auto text-center" data-aos="fade-up">
        <p className="font-serif italic text-3xl md:text-5xl leading-tight text-charcoal">“{quote}”</p>
        {attribution && <cite className="block mt-6 eyebrow not-italic">{attribution}</cite>}
      </blockquote>
    </section>
  );
}