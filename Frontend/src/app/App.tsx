import './App.css'
import ProductList from '../pages/product-list/ProductList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/product-page/ProductPage';

export default function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ProductList />} />
        <Route path="product/:id" element={<ProductPage/>} />
      </Routes>
    </BrowserRouter>
       
    </>
  )
}
