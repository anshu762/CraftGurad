import LegalPageLayout from '../components/editorial/LegalPageLayout.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Privacy() {
  useDocumentTitle('Privacy Policy', 'How CraftGuard collects, uses and protects visitor and artisan data.');
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="Pending finalization">
      <p>This page will describe what personal data CraftGuard collects (such as offer-form submissions), how it is stored, who can access it, and how long it is retained. Final legal content is pending review by the project owner.</p>
      <p>Artisan-specific data — including portraits, quotes, names and locations — is governed separately by our consent framework, documented on the About page.</p>
    </LegalPageLayout>
  );
}