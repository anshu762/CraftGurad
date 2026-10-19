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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Image Panel (hidden on mobile) */}
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src="/images/home/kasuti-process.jpeg"
          alt="Kasuti artisan's hands mid-stitch on red cotton fabric"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20" />
        <div className="relative z-10 h-full flex flex-col justify-end p-12">
          <p className="eyebrow !text-cream/70 mb-4 tracking-widest">CraftGuard</p>
          <h2 className="font-serif text-4xl xl:text-5xl text-cream leading-tight mb-4">
            The hands behind<br />Kasuti &amp; Ilkal
          </h2>
          <p className="text-cream/80 text-base max-w-md leading-relaxed">
            Log in to follow your offers, support makers, and stay connected to the craft archive.
          </p>
          <div className="w-16 h-0.5 bg-terracotta mt-8" />
        </div>
      </div>

      {/* Right: Form Panel */}
      <div className="flex items-center justify-center px-5 md:px-8 py-20 md:py-28 bg-cream">
        <div className="w-full max-w-md" data-aos="fade-up" data-aos-duration="800">
          <p className="eyebrow !text-terracotta mb-3 tracking-widest">Welcome back</p>
          <h1 className="text-3xl md:text-4xl font-serif mb-3">Log in to CraftGuard</h1>
          <p className="text-sm text-mute mb-8 leading-relaxed">
            Access your account to make offers and track your bids.
          </p>

          <FormAlert message={formError} />

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              required
              autoComplete="current-password"
            />

            <button
              type="submit"
              disabled={submitting}
              className="group relative w-full bg-charcoal text-cream py-4 text-sm rounded-xl uppercase tracking-widest overflow-hidden transition-all duration-500 hover:py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">{submitting ? 'Logging in…' : 'Log In'}</span>
              <div className="absolute inset-0 bg-terracotta transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-line text-center">
            <p className="text-sm text-mute">
              Don't have an account?{' '}
              <Link to="/register" className="text-terracotta underline underline-offset-4 hover:text-charcoal transition-colors">
                Create one
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-line/40 border border-line rounded-xl text-center">
            <p className="text-xs text-mute leading-relaxed">
              <span className="uppercase tracking-widest block mb-1">Test accounts</span>
              buyer@craftguard.test · artisan@craftguard.test · admin@craftguard.test
              <br />
              Password: Password123
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