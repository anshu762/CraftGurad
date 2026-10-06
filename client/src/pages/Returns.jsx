import LegalPageLayout from '../components/editorial/LegalPageLayout.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Returns() {
  useDocumentTitle('Returns & Exchanges', "CraftGuard's approach to returns given the handmade, one-of-a-kind nature of each piece.");
  return (
    <LegalPageLayout title="Returns & Exchanges" lastUpdated="Pending finalization">
      <p>Because each documented piece is handmade and often one-of-a-kind, return and exchange conditions differ from conventional retail. Full policy details are pending confirmation with the project owner and participating artisans.</p>
    </LegalPageLayout>
  );
}