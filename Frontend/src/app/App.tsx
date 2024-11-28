import './App.css'
import ProductList from '../pages/product-list/ProductList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/product-page/ProductPage';
import AuthPage from '../pages/auth/AuthPage';

export default function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ProductList />} />
        <Route path="product/:id" element={<ProductPage/>} />
        <Route path="auth" element={<AuthPage/>} />
      </Routes>
    </BrowserRouter>
       
    </>
  )
}
