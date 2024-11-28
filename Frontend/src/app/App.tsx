import './App.css'
import MainPage from '../pages/main-page/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/product-page/ProductPage';
import NavBar from '../components/NavBar';

export default function App() {

  return (
    <>
      <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="product/:id" element={<ProductPage/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
