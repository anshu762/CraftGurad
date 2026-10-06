import LegalPageLayout from '../components/editorial/LegalPageLayout.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Terms() {
  useDocumentTitle('Terms of Use', 'The terms governing use of the CraftGuard website and offer system.');
  return (
    <LegalPageLayout title="Terms of Use" lastUpdated="Pending finalization">
      <p>This page will set out the terms governing use of the CraftGuard website, including offer submission conduct, intended use of product and story content, and limitations of liability. Final legal content is pending review by the project owner.</p>
    </LegalPageLayout>
  );
}