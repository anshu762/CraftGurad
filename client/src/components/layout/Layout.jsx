import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SkipLink from './SkipLink.jsx';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}