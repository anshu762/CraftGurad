import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Navigation links configuration (modular)
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/kasuti', label: 'Kasuti' },
  { to: '/ilkal', label: 'Ilkal' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
];

// Header Component
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-cream/95 backdrop-blur-md shadow-lg border-b border-line' 
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <NavLink 
              to="/" 
              className="group relative font-serif text-2xl md:text-3xl tracking-wide text-charcoal"
              aria-label="CRAFTGUARD Home"
            >
              <span className="relative z-10">
                CRAFT
                <span className="text-terracotta group-hover:text-charcoal transition-colors duration-500">
                  GUARD
                </span>
              </span>
              {/* Underline animation */}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta group-hover:w-full transition-all duration-500" />
            </NavLink>

            {/* Desktop Navigation */}
            <nav 
              className="hidden md:flex items-center gap-2" 
              aria-label="Primary navigation"
            >
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm uppercase tracking-widest transition-all duration-300 ${
                      isActive 
                        ? 'text-terracotta' 
                        : 'text-charcoal hover:text-terracotta'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.label}</span>
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute inset-0 bg-terracotta/10 -skew-x-12 transform scale-x-0 animate-scaleIn" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              {/* Login Button */}
              <NavLink
                to="/login"
                className="ml-4 px-6 py-2.5 text-sm rounded-xl uppercase tracking-widest border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-500 relative overflow-hidden group"
              >
                <span className="relative z-10">Artisan Login</span>
                <div className="absolute inset-0 bg-charcoal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </NavLink>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 relative z-50"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <div className="w-8 h-8 flex flex-col justify-center items-center">
                <span 
                  className={`block w-6 h-0.5 bg-charcoal transition-all duration-500 ${
                    open ? 'rotate-45 translate-y-2' : '-translate-y-1.5'
                  }`} 
                />
                <span 
                  className={`block w-6 h-0.5 bg-charcoal transition-all duration-500 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`} 
                />
                <span 
                  className={`block w-6 h-0.5 bg-charcoal transition-all duration-500 ${
                    open ? '-rotate-45 -translate-y-2' : 'translate-y-1.5'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-cream md:hidden transition-all duration-500 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="flex flex-col items-center justify-center h-full px-8"
        >
          <div className="w-full max-w-md space-y-6">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block text-center text-2xl md:text-3xl font-serif uppercase tracking-widest transition-all duration-500 ${
                    isActive 
                      ? 'text-terracotta' 
                      : 'text-charcoal hover:text-terracotta'
                  }`
                }
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: open ? 'slideInUp 0.5s ease-out forwards' : 'none'
                }}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {/* Mobile active indicator */}
                    <div className={`h-0.5 bg-terracotta mt-2 transition-all duration-500 ${
                      isActive ? 'w-full' : 'w-0'
                    }`} />
                  </>
                )}
              </NavLink>
            ))}

            {/* Mobile Login */}
            <div className="pt-8" style={{ animationDelay: `${navLinks.length * 100}ms` }}>
              <NavLink
                to="/login"
                className="block w-full text-center py-4 text-lg uppercase tracking-widest border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-500"
              >
                Artisan Login
              </NavLink>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-xs uppercase tracking-widest text-mute">
              © {new Date().getFullYear()} CRAFTGUARD
            </p>
          </div>
        </nav>
      </div>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20 md:h-24" />
    </>
  );
}























// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';

// const navLinks = [
//   { to: '/', label: 'Home' },
//   { to: '/kasuti', label: 'Kasuti' },
//   { to: '/ilkal', label: 'Ilkal' },
//   { to: '/gallery', label: 'Gallery' },
//   { to: '/about', label: 'About' },
// ];

// export default function Header() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur border-b border-line">
//       <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
//         <NavLink to="/" className="font-serif text-lg md:text-xl tracking-wide text-charcoal">
//           CRAFT<span className="text-terracotta">GUARD</span>
//         </NavLink>

//         <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
//           {navLinks.map((l) => (
//             <NavLink
//               key={l.to}
//               to={l.to}
//               className={({ isActive }) =>
//                 `eyebrow !normal-case !text-sm transition-colors hover:text-terracotta ${
//                   isActive ? 'text-terracotta' : 'text-charcoal'
//                 }`
//               }
//             >
//               {l.label}
//             </NavLink>
//           ))}
//           <NavLink
//             to="/login"
//             className="eyebrow !normal-case !text-sm border border-charcoal px-4 py-2 rounded-sm hover:bg-charcoal hover:text-cream transition-colors"
//           >
//             Artisan Login
//           </NavLink>
//         </nav>

//         <button
//           className="md:hidden p-2"
//           aria-expanded={open}
//           aria-controls="mobile-nav"
//           aria-label={open ? 'Close menu' : 'Open menu'}
//           onClick={() => setOpen((o) => !o)}
//         >
//           <span className="block w-6 h-0.5 bg-charcoal mb-1.5" />
//           <span className="block w-6 h-0.5 bg-charcoal mb-1.5" />
//           <span className="block w-6 h-0.5 bg-charcoal" />
//         </button>
//       </div>

//       {open && (
//         <nav
//           id="mobile-nav"
//           aria-label="Mobile primary"
//           className="md:hidden border-t border-line bg-cream px-5 py-4 flex flex-col gap-4"
//         >
//           {navLinks.map((l) => (
//             <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="eyebrow !normal-case !text-base">
//               {l.label}
//             </NavLink>
//           ))}
//           <NavLink to="/login" onClick={() => setOpen(false)} className="eyebrow !normal-case !text-base text-terracotta">
//             Artisan Login
//           </NavLink>
//         </nav>
//       )}
//     </header>
//   );
// }