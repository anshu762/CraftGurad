import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5">
      <p className="eyebrow mb-4">404</p>
      <h1 className="text-3xl md:text-4xl mb-6">This page isn't part of the archive.</h1>
      <Link to="/" className="text-sm uppercase tracking-wide border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta">
        Return home →
      </Link>
    </div>
  );
}