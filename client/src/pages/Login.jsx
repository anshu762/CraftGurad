import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import TextField from '../components/forms/TextField.jsx';
import FormAlert from '../components/forms/FormAlert.jsx';

export default function Login() {
  useDocumentTitle('Login', 'Log in to your CraftGuard account to make offers and track your bids.');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/account';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setFormError('');
    setSubmitting(true);
    try {
      const user = await login(form.email, form.password);
      const redirectTo =
        user.role === 'ARTISAN' ? '/artisan/dashboard' :
        (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') ? '/admin' : from;
      navigate(redirectTo, { replace: true });
    } catch (err) {
      if (err.fieldErrors) setErrors(flatten(err.fieldErrors));
      else setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-5 md:px-8 py-20 md:py-28">
      <p className="eyebrow mb-4">Welcome back</p>
      <h1 className="text-3xl md:text-4xl mb-8">Log in to CraftGuard</h1>
      <FormAlert message={formError} />
      <form onSubmit={handleSubmit} noValidate>
        <TextField label="Email address" type="email" name="email" value={form.email} onChange={handleChange} error={errors.email} required autoComplete="email" />
        <TextField label="Password" type="password" name="password" value={form.password} onChange={handleChange} error={errors.password} required autoComplete="current-password" />
        <button type="submit" disabled={submitting} className="w-full bg-charcoal text-cream py-3 text-sm uppercase tracking-wide hover:bg-terracotta transition-colors disabled:opacity-60">
          {submitting ? 'Logging in…' : 'Log In'}
        </button>
      </form>
      <p className="text-sm text-mute mt-8 text-center">
        Don't have an account? <Link to="/register" className="text-terracotta underline">Create one</Link>
      </p>
      <p className="text-xs text-mute mt-4 text-center">
        Test accounts: buyer@craftguard.test · artisan@craftguard.test · admin@craftguard.test (password: Password123)
      </p>
    </div>
  );
}

function flatten(fieldErrors) {
  const out = {};
  for (const k in fieldErrors) out[k] = fieldErrors[k]?.[0];
  return out;
}