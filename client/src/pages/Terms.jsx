import LegalPageLayout from '../components/editorial/LegalPageLayout.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Terms() {
  useDocumentTitle('Terms of Use', 'The terms governing use of the CraftGuard website and offer system.');
  return (
    <LegalPageLayout title="Terms of Use" lastUpdated="Last reviewed: 2025">
      <p>
        These Terms of Use govern your access to and use of CraftGuard, a platform documenting and connecting
        buyers with handmade craft traditions — currently Kasuti embroidery and Ilkal weaving, with more to follow.
        By using this site, you agree to these terms.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">1. Accounts &amp; eligibility</h2>
      <p>
        You must be able to form a legally binding agreement to create an account. CraftGuard supports buyer and
        artisan accounts, each with access appropriate to that role. You are responsible for maintaining the
        confidentiality of your login credentials and for all activity under your account.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">2. How offers work</h2>
      <p>
        Products on CraftGuard are not sold through an instant "buy now" checkout. Instead, you add pieces to your
        cart and submit a proposed amount as an offer. Submitting an offer is <strong>not</strong> a binding purchase
        — it is a proposal that the artisan, or a CraftGuard administrator acting on the artisan's behalf, may
        accept, decline, or respond to with a counter-offer. Offers do not expire automatically unless you are told
        otherwise; if you wish to withdraw an offer before it has been acted on, please contact us using the details
        below, as this currently requires manual assistance.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">3. Accepted offers</h2>
      <p>
        Once an offer is accepted, it becomes a firm agreement to proceed with the sale at the agreed amount. Final
        payment and delivery logistics are arranged directly between you and the artisan, or the CraftGuard team on
        the artisan's behalf, using the contact details you provided. CraftGuard does not currently process payment
        on this website. Please see our Shipping Information and Returns &amp; Exchanges pages for how this works in
        practice.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">4. Pricing</h2>
      <p>
        All prices are listed in Indian Rupees (INR) unless otherwise stated. Listed prices and reserve prices
        reflect the artisan's valuation of a handmade, often one-of-a-kind piece and may not be directly comparable
        to mass-manufactured goods.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">5. Artisan listings &amp; content</h2>
      <p>
        Artisans are responsible for the accuracy of the listings they create, including descriptions, materials
        and pricing. Artisan-identifying content (name, portrait, location, quotes) is only displayed where consent
        has been explicitly granted and may be withdrawn or restricted by CraftGuard administrators at any time to
        protect an artisan's interests.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">6. Intellectual property</h2>
      <p>
        Product photography, craft story content and site design are owned by CraftGuard or the respective artisans
        and are protected by applicable intellectual property law. You may not reproduce, redistribute or
        commercially reuse this content without prior written permission.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">7. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul className="list-disc pl-5 space-y-2 mt-3">
        <li>Submit fraudulent, abusive or bad-faith offers;</li>
        <li>Harass, misrepresent your identity to, or attempt to circumvent consent protections for, any artisan;</li>
        <li>Scrape, systematically extract, or misuse data from the site;</li>
        <li>Attempt to gain unauthorized access to accounts, administrative functions, or platform infrastructure.</li>
      </ul>
      <p className="mt-3">Violation of these terms may result in suspension or termination of your account.</p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">8. Disclaimers</h2>
      <p>
        Each piece is handmade, and natural variation in colour, texture and pattern compared to photographs is
        expected and is not a defect. Products are provided "as documented," and CraftGuard makes no warranty beyond
        the description given at listing.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">9. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, CraftGuard is not liable for indirect, incidental or consequential
        damages arising from your use of the site or from transactions arranged between you and an artisan.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">10. Suspension &amp; termination</h2>
      <p>
        We may suspend or deactivate an account that violates these terms. You may not deactivate your own account
        while an administrative role is assigned to it; contact us if you need assistance closing your account.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">11. Governing law</h2>
      <p>
        These terms are governed by the laws of India, with courts in Karnataka having jurisdiction, unless
        otherwise required by applicable law. This section should be confirmed against CraftGuard's registered legal
        entity before public launch.
      </p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">12. Changes to these terms</h2>
      <p>We may update these terms from time to time. Continued use of the site after changes take effect constitutes acceptance of the revised terms.</p>

      <h2 className="font-serif text-xl md:text-2xl mt-10 mb-3 text-charcoal">13. Contact</h2>
      <p>
        Questions about these terms can be sent to{' '}
        <a href="mailto:hello@craftguard.example" className="underline hover:text-terracotta">hello@craftguard.example</a>.
      </p>
    </LegalPageLayout>
  );
}