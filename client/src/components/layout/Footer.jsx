import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <p className="font-serif text-xl mb-3">CRAFTGUARD</p>
          <p className="text-sm text-cream/70 max-w-xs">
            A living archive of craft, makers and market access — documenting Kasuti and Ilkal traditions.
          </p>
        </div>
        <FooterCol title="Explore" links={[
          { to: '/kasuti', label: 'Kasuti' },
          { to: '/ilkal', label: 'Ilkal' },
          { to: '/gallery', label: 'Gallery' },
          { to: '/about', label: 'About' },
        ]} />
        <FooterCol title="Policies" links={[
          { to: '/privacy', label: 'Privacy' },
          { to: '/terms', label: 'Terms' },
          { to: '/shipping', label: 'Shipping' },
          { to: '/returns', label: 'Returns' },
          { to: '/accessibility', label: 'Accessibility' },
        ]} />
        <FooterCol title="Connect" links={[
          { to: '/contact', label: 'Contact' },
          { to: '/login', label: 'Artisan Login' },
        ]} />
      </div>
      <div className="border-t border-cream/15 text-center text-xs text-cream/50 py-6">
        © {new Date().getFullYear()} CRAFTGUARD. All stories and images are used with documented consent.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p className="eyebrow !text-cream/60 mb-4">{title}</p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-cream/80 hover:text-terracotta transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}