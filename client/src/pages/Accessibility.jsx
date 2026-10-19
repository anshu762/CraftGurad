import LegalPageLayout from '../components/editorial/LegalPageLayout.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Accessibility() {
  useDocumentTitle('Accessibility Statement', "CraftGuard's commitment to an accessible, WCAG 2.2 AA-oriented experience.");
  return (
    <LegalPageLayout title="Accessibility Statement" lastUpdated="Ongoing">
      <p>
        CraftGuard is built with an accessibility-first approach, targeting WCAG 2.2 AA conformance across browsing,
        offers, cart, account and dashboard experiences.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">What we do</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Keyboard-operable navigation, galleries, cart, offer forms and account menus, including visible focus states throughout;</li>
        <li>Modals and dropdowns — such as the account menu and notification panel — can be closed with the Escape key and close automatically when you click outside them;</li>
        <li>Descriptive alternative text for product, process and artisan imagery;</li>
        <li>Status updates such as search results and loading states are announced to screen readers through live regions;</li>
        <li>Respect for reduced-motion preferences in animated transitions;</li>
        <li>Sufficient colour contrast across text, interactive elements and status indicators.</li>
      </ul>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">Ongoing work</h2>
      <p>
        Accessibility is an ongoing commitment rather than a one-time checklist. As new features are added, we
        review them against the same standard, and we welcome feedback that helps us improve.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">Let us know</h2>
      <p>
        If you encounter an accessibility barrier anywhere on this site, please{' '}
        <a href="/contact" className="underline hover:text-terracotta">contact us</a> so we can address it.
      </p>
    </LegalPageLayout>
  );
}