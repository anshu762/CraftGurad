import { useState } from 'react';
import { apiClient } from '../../lib/apiClient.js';
import { formatINR } from '../../lib/format.js';
import useAuth from '../../hooks/useAuth.js';

export default function CheckoutModal({ items, onClose, onSuccess }) {
  const { user } = useAuth();
  const [phone, setPhone] = useState(user?.phone || '');
  const [preferredContact, setPreferredContact] = useState('EMAIL');
  const [shippingLocation, setShippingLocation] = useState('');
  const [message, setMessage] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');

  const total = items.reduce((sum, i) => sum + (i.draftAmount || 0), 0);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    setFieldErrors({});
    setSubmitting(true);
    try {
      await apiClient.post('/offers/submit', {
        itemIds: items.map((i) => i.id),
        phone,
        preferredContact,
        shippingLocation,
        message,
        consentGiven,
        termsAccepted,
      });
      onSuccess();
    } catch (err) {
      setFormError(err.message);
      setFieldErrors(err.fieldErrors || {});
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-charcoal/60 flex items-center justify-center z-50 px-4 py-8" role="dialog" aria-modal="true">
      <div className="bg-paper max-w-lg w-full rounded-sm p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <p className="eyebrow mb-2">Submit Your Offers</p>
        <h2 className="text-2xl font-serif mb-4">Confirm &amp; Send</h2>

        <ul className="text-sm text-mute mb-6 space-y-1">
          {items.map((i) => (
            <li key={i.id} className="flex justify-between gap-4">
              <span className="truncate">{i.product.name}</span>
              <span className="flex-shrink-0">{formatINR(i.draftAmount)}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm font-medium mb-6 flex justify-between border-t border-line pt-3">
          <span>Total offered</span><span>{formatINR(total)}</span>
        </p>

        {formError && <p className="text-terracotta text-sm mb-4" role="alert">{formError}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-mute mb-1">Phone number</label>
            <input
              type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required
              className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
            {fieldErrors.phone && <p className="text-terracotta text-xs mt-1">{fieldErrors.phone[0]}</p>}
          </div>

          <div>
            <label className="block text-xs text-mute mb-1">Preferred contact method</label>
            <select
              value={preferredContact} onChange={(e) => setPreferredContact(e.target.value)}
              className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta"
            >
              <option value="EMAIL">Email</option>
              <option value="PHONE">Phone</option>
              <option value="WHATSAPP">WhatsApp</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-mute mb-1">Shipping location (optional)</label>
            <input
              type="text" value={shippingLocation} onChange={(e) => setShippingLocation(e.target.value)}
              className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          </div>

          <div>
            <label className="block text-xs text-mute mb-1">Message to the artisan (optional)</label>
            <textarea
              value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
              className="w-full border border-line px-3 py-2 text-sm rounded-sm bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-mute">
            <input type="checkbox" checked={consentGiven} onChange={(e) => setConsentGiven(e.target.checked)} className="mt-0.5" />
            I consent to sharing my name, email and phone number with the artisan for the purpose of this offer.
          </label>
          {fieldErrors.consentGiven && <p className="text-terracotta text-xs">{fieldErrors.consentGiven[0]}</p>}

          <label className="flex items-start gap-2 text-xs text-mute">
            <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-0.5" />
            I accept the offer terms and understand this is a non-binding offer until accepted by the artisan.
          </label>
          {fieldErrors.termsAccepted && <p className="text-terracotta text-xs">{fieldErrors.termsAccepted[0]}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-charcoal px-5 py-3 text-sm uppercase tracking-wide hover:bg-charcoal hover:text-cream transition-colors rounded-sm">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="flex-1 bg-charcoal text-cream px-5 py-3 text-sm uppercase tracking-wide hover:bg-terracotta transition-colors rounded-sm disabled:opacity-60">
              {submitting ? 'Submitting…' : 'Submit Offers'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}