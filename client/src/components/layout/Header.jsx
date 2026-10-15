import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import useCart from '../../hooks/useCart.js';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/kasuti', label: 'Kasuti' },
  { to: '/ilkal', label: 'Ilkal' },
  { to: '/gallery', label: 'Products' },
  { to: '/about', label: 'About' },
];

function CartLink({ count }) {
  return (
    <NavLink to="/cart" aria-label={`My cart, ${count} item${count === 1 ? '' : 's'}`} className="relative p-2 text-charcoal hover:text-terracotta transition-colors">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-terracotta text-cream text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center" aria-hidden="true">
          {count}
        </span>
      )}
    </NavLink>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const cartCount = cart.items.length;

  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setAccountOpen(false);
    }
    function onEscape(e) {
      if (e.key === 'Escape') setAccountOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  async function handleLogout() {
    await logout();
    setAccountOpen(false);
    navigate('/', { replace: true });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        <NavLink to="/" className="font-serif text-lg md:text-xl tracking-wide text-charcoal">
          CRAFT<span className="text-terracotta">GUARD</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `eyebrow !normal-case !text-sm transition-colors hover:text-terracotta ${isActive ? 'text-terracotta' : 'text-charcoal'}`}>
              {l.label}
            </NavLink>
          ))}

          {!loading && user && <CartLink count={cartCount} />}

          {!loading && !user && (
            <NavLink to="/login" className="eyebrow !normal-case !text-sm border border-charcoal px-4 py-2 rounded-sm hover:bg-charcoal hover:text-cream transition-colors">
              Login
            </NavLink>
          )}

          {!loading && user && (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setAccountOpen((o) => !o)} aria-expanded={accountOpen} aria-haspopup="true" className="eyebrow !normal-case !text-sm border border-charcoal px-4 py-2 rounded-sm hover:bg-charcoal hover:text-cream transition-colors">
                {user.name.split(' ')[0]} ▾
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-paper border border-line rounded-sm shadow-lg py-2">
                  <NavLink to="/account" className="block px-4 py-2 text-sm hover:bg-line/40" onClick={() => setAccountOpen(false)}>My Account</NavLink>
                  <NavLink to="/cart" className="block px-4 py-2 text-sm hover:bg-line/40" onClick={() => setAccountOpen(false)}>
                    My Cart {cartCount > 0 && `(${cartCount})`}
                  </NavLink>
                  {user.role === 'ARTISAN' && (
                    <NavLink to="/artisan/dashboard" className="block px-4 py-2 text-sm hover:bg-line/40" onClick={() => setAccountOpen(false)}>Artisan Dashboard</NavLink>
                  )}
                  {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') && (
                    <NavLink to="/admin" className="block px-4 py-2 text-sm hover:bg-line/40" onClick={() => setAccountOpen(false)}>Admin Dashboard</NavLink>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-terracotta hover:bg-line/40">Log Out</button>
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          {!loading && user && <CartLink count={cartCount} />}
          <button className="p-2" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            <span className="block w-6 h-0.5 bg-charcoal mb-1.5" />
            <span className="block w-6 h-0.5 bg-charcoal mb-1.5" />
            <span className="block w-6 h-0.5 bg-charcoal" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile primary" className="md:hidden border-t border-line bg-cream px-5 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="eyebrow !normal-case !text-base">{l.label}</NavLink>
          ))}
          {!loading && !user && (
            <NavLink to="/login" onClick={() => setOpen(false)} className="eyebrow !normal-case !text-base text-terracotta">Login</NavLink>
          )}
          {!loading && user && (
            <>
              <NavLink to="/account" onClick={() => setOpen(false)} className="eyebrow !normal-case !text-base">My Account ({user.name.split(' ')[0]})</NavLink>
              <NavLink to="/cart" onClick={() => setOpen(false)} className="eyebrow !normal-case !text-base">My Cart {cartCount > 0 && `(${cartCount})`}</NavLink>
              {user.role === 'ARTISAN' && <NavLink to="/artisan/dashboard" onClick={() => setOpen(false)} className="eyebrow !normal-case !text-base">Artisan Dashboard</NavLink>}
              {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') && <NavLink to="/admin" onClick={() => setOpen(false)} className="eyebrow !normal-case !text-base">Admin Dashboard</NavLink>}
              <button onClick={() => { handleLogout(); setOpen(false); }} className="eyebrow !normal-case !text-base text-terracotta text-left">Log Out</button>
            </>
          )}
        </nav>
      )}
    </header>
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