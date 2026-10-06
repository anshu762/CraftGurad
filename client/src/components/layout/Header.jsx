import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/kasuti', label: 'Kasuti' },
  { to: '/ilkal', label: 'Ilkal' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        <NavLink to="/" className="font-serif text-lg md:text-xl tracking-wide text-charcoal">
          CRAFT<span className="text-terracotta">GUARD</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `eyebrow !normal-case !text-sm transition-colors hover:text-terracotta ${
                  isActive ? 'text-terracotta' : 'text-charcoal'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            className="eyebrow !normal-case !text-sm border border-charcoal px-4 py-2 rounded-sm hover:bg-charcoal hover:text-cream transition-colors"
          >
            Artisan Login
          </NavLink>
        </nav>

        <button
          className="md:hidden p-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-6 h-0.5 bg-charcoal mb-1.5" />
          <span className="block w-6 h-0.5 bg-charcoal mb-1.5" />
          <span className="block w-6 h-0.5 bg-charcoal" />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile primary"
          className="md:hidden border-t border-line bg-cream px-5 py-4 flex flex-col gap-4"
        >
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="eyebrow !normal-case !text-base">
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/login" onClick={() => setOpen(false)} className="eyebrow !normal-case !text-base text-terracotta">
            Artisan Login
          </NavLink>
        </nav>
      )}
    </header>
  );
}