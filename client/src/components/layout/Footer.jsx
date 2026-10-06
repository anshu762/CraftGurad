import { Link } from 'react-router-dom';

// Footer column data (modular configuration)
const footerSections = {
  explore: {
    title: 'Explore',
    links: [
      { to: '/kasuti', label: 'Kasuti' },
      { to: '/ilkal', label: 'Ilkal' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/about', label: 'About' },
    ],
  },
  policies: {
    title: 'Policies',
    links: [
      { to: '/privacy', label: 'Privacy' },
      { to: '/terms', label: 'Terms' },
      { to: '/shipping', label: 'Shipping' },
      { to: '/returns', label: 'Returns' },
      { to: '/accessibility', label: 'Accessibility' },
    ],
  },
  connect: {
    title: 'Connect',
    links: [
      { to: '/contact', label: 'Contact' },
      { to: '/login', label: 'Artisan Login' },
    ],
  },
};

// Social links (modular - add as needed)
const socialLinks = [
  { 
    name: 'Instagram', 
    href: '#', 
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  { 
    name: 'Twitter', 
    href: '#', 
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    )
  },
  { 
    name: 'Facebook', 
    href: '#', 
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
];

// Footer Column Component (modular)
function FooterColumn({ title, links, align = 'left' }) {
  return (
    <div className={`text-${align}`}>
      <h3 className="eyebrow !text-cream/60 mb-6 uppercase tracking-widest text-sm">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link 
              to={link.to} 
              className="group flex items-center gap-2 text-sm text-cream/80 hover:text-terracotta transition-all duration-300"
            >
              <span className="w-0 h-0.5 bg-terracotta group-hover:w-4 transition-all duration-300" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main Footer Component
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream mt-32" role="contentinfo">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          
          {/* Brand Column (spans 4 columns on desktop) */}
          <div className="md:col-span-4">
            {/* Logo */}
            <Link to="/" className="inline-block mb-6">
              <p className="font-serif text-3xl md:text-4xl tracking-wide">
                CRAFT<span className="text-terracotta">GUARD</span>
              </p>
            </Link>
            
            {/* Description */}
            <p className="text-sm text-cream/70 leading-relaxed mb-8 max-w-sm">
              A living archive of craft, makers and market access — documenting 
              Kasuti and Ilkal traditions with respect and consent.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 flex items-center justify-center border border-cream/20 rounded-full text-cream/60 hover:border-terracotta hover:text-terracotta hover:bg-terracotta/10 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore Column */}
          <div className="md:col-span-3">
            <FooterColumn 
              title={footerSections.explore.title} 
              links={footerSections.explore.links} 
            />
          </div>

          {/* Policies Column */}
          <div className="md:col-span-3">
            <FooterColumn 
              title={footerSections.policies.title} 
              links={footerSections.policies.links} 
            />
          </div>

          {/* Connect Column */}
          <div className="md:col-span-2">
            <FooterColumn 
              title={footerSections.connect.title} 
              links={footerSections.connect.links} 
              align="left"
            />
          </div>
        </div>
      </div>

      {/* Newsletter Section (optional modular component) */}
      <div className="border-t border-cream/15">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl mb-2">Stay Updated</h3>
              <p className="text-sm text-cream/60">
                Subscribe to receive updates on new craft stories and collections.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 bg-charcoal border border-cream/20 text-cream placeholder-cream/40 focus:outline-none focus:border-terracotta transition-colors w-full md:w-64"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-terracotta text-cream uppercase tracking-widest text-sm hover:bg-cream hover:text-charcoal transition-all duration-500 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/15">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-cream/50 text-center md:text-left">
              © {currentYear} CRAFTGUARD. All stories and images are used with documented consent.
            </p>

            {/* Crafted with love */}
            <div className="flex items-center gap-2 text-xs text-cream/50">
              <span>Crafted with</span>
              <svg className="w-4 h-4 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              <span>for craft and culture</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-charcoal via-terracotta to-charcoal" />
    </footer>
  );
}



























// import { Link } from 'react-router-dom';

// export default function Footer() {
//   return (
//     <footer className="bg-charcoal text-cream mt-24">
//       <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
//         <div>
//           <p className="font-serif text-xl mb-3">CRAFTGUARD</p>
//           <p className="text-sm text-cream/70 max-w-xs">
//             A living archive of craft, makers and market access — documenting Kasuti and Ilkal traditions.
//           </p>
//         </div>
//         <FooterCol title="Explore" links={[
//           { to: '/kasuti', label: 'Kasuti' },
//           { to: '/ilkal', label: 'Ilkal' },
//           { to: '/gallery', label: 'Gallery' },
//           { to: '/about', label: 'About' },
//         ]} />
//         <FooterCol title="Policies" links={[
//           { to: '/privacy', label: 'Privacy' },
//           { to: '/terms', label: 'Terms' },
//           { to: '/shipping', label: 'Shipping' },
//           { to: '/returns', label: 'Returns' },
//           { to: '/accessibility', label: 'Accessibility' },
//         ]} />
//         <FooterCol title="Connect" links={[
//           { to: '/contact', label: 'Contact' },
//           { to: '/login', label: 'Artisan Login' },
//         ]} />
//       </div>
//       <div className="border-t border-cream/15 text-center text-xs text-cream/50 py-6">
//         © {new Date().getFullYear()} CRAFTGUARD. All stories and images are used with documented consent.
//       </div>
//     </footer>
//   );
// }

// function FooterCol({ title, links }) {
//   return (
//     <div>
//       <p className="eyebrow !text-cream/60 mb-4">{title}</p>
//       <ul className="space-y-2">
//         {links.map((l) => (
//           <li key={l.to}>
//             <Link to={l.to} className="text-sm text-cream/80 hover:text-terracotta transition-colors">
//               {l.label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }