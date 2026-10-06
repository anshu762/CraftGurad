import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SkipLink from './SkillLink.jsx';
import PageLoader from './PageLoader.jsx';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}