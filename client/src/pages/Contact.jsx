import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Contact() {
  useDocumentTitle('Contact', 'Get in touch with the CraftGuard project team.');
  return (
    <div className="max-w-prose mx-auto px-5 md:px-8 py-20 md:py-28 text-center">
      <p className="eyebrow mb-4">Get in touch</p>
      <h1 className="text-3xl md:text-4xl mb-6">Contact CraftGuard</h1>
      <p className="text-base leading-relaxed text-charcoal/90 mb-8">
        For questions about the project, consent, collaboration, or press, reach out at the email below.
        A dedicated contact form will be added in a future phase.
      </p>
      <a href="mailto:hello@craftguard.example" className="text-lg font-serif border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors">
        hello@craftguard.example
      </a>
    </div>
  );
}