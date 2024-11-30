import './App.css'
import MainPage from '../pages/main-page/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/product-page/ProductPage';
import AuthPage from '../pages/auth/AuthPage';
import NavBar from '../components/NavBar';
import FavoritesPage from '../pages/favoritesPr-page/FavoritesPage';
import Footer from '../components/Footer';

export default function App() {

  return (
    <>
      <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="product/:id" element={<ProductPage/>} />
        <Route path="auth" element={<AuthPage/>} />
        <Route path="favorites" element={<FavoritesPage/>} />
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  )
}
