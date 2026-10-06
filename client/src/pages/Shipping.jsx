import LegalPageLayout from '../components/editorial/LegalPageLayout.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Shipping() {
  useDocumentTitle('Shipping Information', 'Shipping timelines and handling details for CraftGuard documented pieces.');
  return (
    <LegalPageLayout title="Shipping Information" lastUpdated="Pending finalization">
      <p>Shipping timelines, packaging approach for handmade textiles, and delivery regions will be documented here once the operational workflow is finalized with the project owner.</p>
    </LegalPageLayout>
  );
}