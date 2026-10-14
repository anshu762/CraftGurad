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

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', termsAccepted: false });
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
      await register({ name: form.name, email: form.email, phone: form.phone, password: form.password, termsAccepted: form.termsAccepted });
      navigate('/account', { replace: true });
    } catch (err) {
      if (err.fieldErrors) setErrors(flatten(err.fieldErrors));
      else setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-5 md:px-8 py-20 md:py-28">
      <p className="eyebrow mb-4">Join CraftGuard</p>
      <h1 className="text-3xl md:text-4xl mb-8">Create your account</h1>
      <FormAlert message={formError} />
      <form onSubmit={handleSubmit} noValidate>
        <TextField label="Full name" name="name" value={form.name} onChange={handleChange} error={errors.name} required autoComplete="name" />
        <TextField label="Email address" type="email" name="email" value={form.email} onChange={handleChange} error={errors.email} required autoComplete="email" />
        <TextField label="Phone (optional)" type="tel" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} autoComplete="tel" />
        <TextField label="Password" type="password" name="password" value={form.password} onChange={handleChange} error={errors.password} required autoComplete="new-password" />
        <TextField label="Confirm password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required autoComplete="new-password" />
        <div className="mb-6">
          <label className="flex items-start gap-3 text-sm text-charcoal/90">
            <input type="checkbox" name="termsAccepted" checked={form.termsAccepted} onChange={handleChange} aria-invalid={!!errors.termsAccepted} className="mt-1" />
            <span>I agree to the <Link to="/terms" className="underline">Terms of Use</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.</span>
          </label>
          {errors.termsAccepted && <p className="text-sm text-terracotta mt-2" role="alert">{errors.termsAccepted}</p>}
        </div>
        <button type="submit" disabled={submitting} className="w-full bg-charcoal text-cream py-3 text-sm uppercase tracking-wide hover:bg-terracotta transition-colors disabled:opacity-60">
          {submitting ? 'Creating account…' : 'Create Account'}
        </button>
      </form>
      <p className="text-sm text-mute mt-8 text-center">
        Already have an account? <Link to="/login" className="text-terracotta underline">Log in</Link>
      </p>
    </div>
  );
}

function flatten(fieldErrors) {
  const out = {};
  for (const k in fieldErrors) out[k] = fieldErrors[k]?.[0];
  return out;
}