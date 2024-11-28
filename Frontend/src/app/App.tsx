import './App.css'
import MainPage from '../pages/main-page/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/product-page/ProductPage';
<<<<<<< HEAD
import AuthPage from '../pages/auth/AuthPage';
=======
import NavBar from '../components/NavBar';
>>>>>>> 1ed0d05f113c90ea02a6f2655fa1e069cc05a205

export default function App() {

  return (
    <>
      <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="product/:id" element={<ProductPage/>} />
        <Route path="auth" element={<AuthPage/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
