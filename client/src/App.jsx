import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import RequireAuth from './components/auth/RequireAuth.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Kasuti = lazy(() => import('./pages/Kasuti.jsx'));
const Ilkal = lazy(() => import('./pages/Ilkal.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Product = lazy(() => import('./pages/Product.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Account = lazy(() => import('./pages/Account.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const ArtisanDashboard = lazy(() => import('./pages/ArtisanDashboard.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const Shipping = lazy(() => import('./pages/Shipping.jsx'));
const Returns = lazy(() => import('./pages/Returns.jsx'));
const Accessibility = lazy(() => import('./pages/Accessibility.jsx'));
const Forbidden = lazy(() => import('./pages/Forbidden.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/kasuti" element={<Kasuti />} />
              <Route path="/ilkal" element={<Ilkal />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
              <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
              <Route path="/artisan/dashboard" element={<RequireAuth roles={['ARTISAN']}><ArtisanDashboard /></RequireAuth>} />
              <Route path="/admin" element={<RequireAuth roles={['ADMIN', 'SUPER_ADMIN']}><Admin /></RequireAuth>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/403" element={<Forbidden />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}