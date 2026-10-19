import LegalPageLayout from '../components/editorial/LegalPageLayout.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Shipping() {
  useDocumentTitle('Shipping Information', 'How shipping works for pieces purchased through the CraftGuard offer system.');
  return (
    <LegalPageLayout title="Shipping Information" lastUpdated="Last reviewed: 2025">
      <p>
        CraftGuard pieces are not shipped through an automated checkout. Because every sale begins as a negotiated
        offer, shipping is arranged directly once that offer is accepted — here's how it works in practice.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">1. After your offer is accepted</h2>
      <p>
        The artisan, or the CraftGuard team acting on their behalf, will reach out using the contact details and
        preferred contact method you provided when you submitted your offer, to confirm packaging, exact shipping
        cost, and an expected dispatch date.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">2. Handling time</h2>
      <p>
        Each piece listed on CraftGuard already exists and has been documented — you are not commissioning a new
        piece to be made. Typical handling and dispatch time once an offer is accepted is 5–7 business days, though
        this can vary and will be confirmed with you directly. Any listing-specific shipping notes provided by the
        artisan will also be shared with you.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">3. Shipping costs</h2>
      <p>
        Shipping costs are not automatically included in your offer amount unless stated otherwise, and will be
        confirmed with you before dispatch based on your shipping location.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">4. Delivery regions</h2>
      <p>
        We primarily support delivery within India. International delivery may be possible for some pieces but is
        handled on a case-by-case basis — please mention this when your offer is submitted or when you are
        contacted after acceptance.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">5. Tracking &amp; communication</h2>
      <p>
        CraftGuard does not currently provide automated shipment tracking on the website. Tracking details, where
        available from the courier used, will be shared with you directly by the artisan or the CraftGuard team.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">6. Customs &amp; import duties</h2>
      <p>
        For international deliveries, any customs fees, import duties or local taxes are the responsibility of the
        buyer and are not included in the agreed offer amount.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">Questions</h2>
      <p>
        If you have questions about shipping before or after your offer is accepted, contact us at{' '}
        <a href="mailto:hello@craftguard.example" className="underline hover:text-terracotta">hello@craftguard.example</a>.
      </p>
    </LegalPageLayout>
  );
}