import { Link } from 'react-router-dom';

export default function StoryNavigation({ currentCraft }) {
  const other = currentCraft === 'kasuti'
    ? { to: '/ilkal', label: 'Ilkal' }
    : { to: '/kasuti', label: 'Kasuti' };

  return (
    <nav aria-label="Story navigation" className="border-t border-line px-5 md:px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link to={other.to} className="group flex items-center gap-3 text-lg font-serif hover:text-terracotta transition-colors">
          <span aria-hidden="true">←</span> Continue to {other.label}
        </Link>
        <Link to="/gallery" className="text-sm uppercase tracking-wide border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors">
          Browse the Gallery →
        </Link>
        <a href="#main-content" className="text-sm uppercase tracking-wide text-mute hover:text-terracotta transition-colors">
          ↑ Back to top
        </a>
      </div>
    </nav>
  );
}