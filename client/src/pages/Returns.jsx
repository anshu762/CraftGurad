import LegalPageLayout from '../components/editorial/LegalPageLayout.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Returns() {
  useDocumentTitle('Returns & Exchanges', "CraftGuard's approach to returns given the handmade, one-of-a-kind nature of each piece.");
  return (
    <LegalPageLayout title="Returns & Exchanges" lastUpdated="Last reviewed: 2025">
      <p>
        Every piece on CraftGuard is handmade, and most are one-of-a-kind. That shapes how returns and exchanges
        work here, differently from standard retail.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">Before your offer is accepted</h2>
      <p>
        Because each piece is individually documented with photographs, materials, dimensions and condition notes,
        we encourage you to review the listing carefully and ask any questions before your offer is accepted.
        Natural variation in colour, texture and pattern compared to photographs is expected with handmade textiles
        and is not considered a fault.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">Once a sale is final</h2>
      <p>
        Because listed pieces are one-of-a-kind and cannot simply be restocked, sales are generally treated as final
        once your offer is accepted and the piece has shipped. Change-of-mind returns are not supported.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">Damaged or materially different items</h2>
      <p>
        If a piece arrives damaged in transit, or is materially different from what was documented in the listing,
        contact us within 3 days of delivery with photographs of the item and its packaging. We will work with you
        and the artisan in good faith to agree on a fair remedy, which may include a partial or full refund,
        depending on what was agreed when your offer was accepted.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">What isn't covered</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Change of mind after an offer has been accepted and the piece has shipped;</li>
        <li>Natural variation in colour, weave or embroidery inherent to handmade textiles;</li>
        <li>Minor irregularities that are part of the handmade character of the piece, rather than damage.</li>
      </ul>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">How refunds are handled</h2>
      <p>
        CraftGuard does not process payments directly through this website — payment is arranged between you and the
        artisan, or the CraftGuard team on the artisan's behalf, once your offer is accepted. Any agreed refund is
        processed the same way, through that same direct arrangement, and we will help coordinate it if needed.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">Exchanges</h2>
      <p>
        Because most pieces are unique, a like-for-like exchange usually isn't possible. Where appropriate, we can
        help you find a comparable available piece instead — contact us to discuss options.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">Requesting a return or remedy</h2>
      <p>
        To start a return, exchange or damage claim, email{' '}
        <a href="mailto:hello@craftguard.example" className="underline hover:text-terracotta">hello@craftguard.example</a>{' '}
        with your offer details and, where relevant, photographs of the issue.
      </p>
    </LegalPageLayout>
  );
}