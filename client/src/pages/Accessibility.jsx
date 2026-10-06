import LegalPageLayout from '../components/editorial/LegalPageLayout.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Accessibility() {
  useDocumentTitle('Accessibility Statement', "CraftGuard's commitment to an accessible, WCAG 2.2 AA-oriented experience.");
  return (
    <LegalPageLayout title="Accessibility Statement" lastUpdated="Ongoing">
      <p>CraftGuard is built with an accessibility-first approach, targeting WCAG 2.2 AA conformance. This includes keyboard-operable navigation and galleries, visible focus states, descriptive image alternatives, respect for reduced-motion preferences, and sufficient color contrast throughout.</p>
      <p>If you encounter an accessibility barrier anywhere on this site, please <a href="/contact" className="underline hover:text-terracotta">contact us</a> so we can address it.</p>
    </LegalPageLayout>
  );
}