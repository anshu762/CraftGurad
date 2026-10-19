import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import TextField from '../components/forms/TextField.jsx';
import FormAlert from '../components/forms/FormAlert.jsx';

export default function Register() {
  useDocumentTitle('Create an Account', 'Create a CraftGuard account to make offers and track your bids.');
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setFormError('');

    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match.' });
      return;
    }
    if (!form.termsAccepted) {
      setErrors({ termsAccepted: 'You must accept the terms to continue.' });
      return;
    }

    setSubmitting(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        termsAccepted: form.termsAccepted,
      });
      navigate('/account', { replace: true });
    } catch (err) {
      if (err.fieldErrors) setErrors(flatten(err.fieldErrors));
      else setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Image Panel (hidden on mobile) */}
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src="/images/ilkal/making-2.webp"
          alt="Weaver's hands working an Ilkal saree on a traditional loom"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20" />
        <div className="relative z-10 h-full flex flex-col justify-end p-12">
          <p className="eyebrow !text-cream/70 mb-4 tracking-widest">CraftGuard</p>
          <h2 className="font-serif text-4xl xl:text-5xl text-cream leading-tight mb-4">
            Join a living<br />craft archive
          </h2>
          <p className="text-cream/80 text-base max-w-md leading-relaxed">
            Create an account to make considered offers, support artisans, and follow the stories behind every piece.
          </p>
          <div className="w-16 h-0.5 bg-terracotta mt-8" />
        </div>
      </div>

      {/* Right: Form Panel */}
      <div className="flex items-center justify-center px-5 md:px-8 py-20 md:py-28 bg-cream">
        <div className="w-full max-w-md" data-aos="fade-up" data-aos-duration="800">
          <p className="eyebrow !text-terracotta mb-3 tracking-widest">Join CraftGuard</p>
          <h1 className="text-3xl md:text-4xl font-serif mb-3">Create your account</h1>
          <p className="text-sm text-mute mb-8 leading-relaxed">
            Be part of a community that values craft, makers, and provenance.
          </p>

          <FormAlert message={formError} />

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <TextField
              label="Full name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              required
              autoComplete="name"
            />
            <TextField
              label="Email address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              required
              autoComplete="email"
            />
            <TextField
              label="Phone (optional)"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              autoComplete="tel"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              required
              autoComplete="new-password"
            />
            <TextField
              label="Confirm password"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              autoComplete="new-password"
            />

            <div className="pt-1">
              <label className="flex items-start gap-3 text-sm text-charcoal/90">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={form.termsAccepted}
                  onChange={handleChange}
                  aria-invalid={!!errors.termsAccepted}
                  className="mt-1 accent-terracotta"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="underline underline-offset-2 hover:text-terracotta transition-colors">Terms of Use</Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="underline underline-offset-2 hover:text-terracotta transition-colors">Privacy Policy</Link>.
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="text-sm text-terracotta mt-2" role="alert">{errors.termsAccepted}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group relative w-full bg-charcoal text-cream py-4 text-sm uppercase tracking-widest overflow-hidden transition-all duration-500 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">{submitting ? 'Creating account…' : 'Create Account'}</span>
              <div className="absolute inset-0 bg-terracotta transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-line text-center">
            <p className="text-sm text-mute">
              Already have an account?{' '}
              <Link to="/login" className="text-terracotta underline underline-offset-4 hover:text-charcoal transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function flatten(fieldErrors) {
  const out = {};
  for (const k in fieldErrors) out[k] = fieldErrors[k]?.[0];
  return out;
}