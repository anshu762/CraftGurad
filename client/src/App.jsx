import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Kasuti from './pages/Kasuti.jsx';
import Ilkal from './pages/Ilkal.jsx';
import Gallery from './pages/Gallery.jsx';
import Product from './pages/Product.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/kasuti" element={<Kasuti />} />
        <Route path="/ilkal" element={<Ilkal />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}