import { Card, CardContent, Rating, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './FavoritesPage.css'
import { useState } from 'react';

export default function FavoritesPage() {
    const [rec1, set1] = useState(true)
    const productsrec = [
        {productId: 1, productName: 'РуФон 16 Про Макс', stars: 5.0, price: `16500`,reviews: '12', date: '12 Декабря' },
        {productId: 2, productName: 'Кепка ободранная', stars: 4.6, price: '900',reviews: '12',date: '12 Декабря' },
        {productId: 3, productName: 'Кончилось', stars: 2.0, price: '4444',reviews: '12',date: '12 Декабря' },
    
      ]
      const productsrand = [
        {productId: 4, productName: 'name 4', stars: 2, price: '1234',reviews: '12',date: '12 Декабря' },
        {productId: 5, productName: 'name 5', stars: 3, price: '9999',reviews: '12',date: '12 Декабря' },
       
      ]
      const products = rec1? productsrec : productsrand;
    return (
        <>
        <h1 className='head'>Избранное</h1>
        <hr></hr>
        <div className='box' >
          <div className='list'>
            {products.map((product) => 
            <Card className='product' key={product.productId}> 
              <NavLink to={`/product/${product.productId}`}>
              <CardContent className="cardContent">
              <img className='img_product' src={`/product_${product.productId}.jpg`} />  
              <h2><span className='price'>{product.price} </span> <img className='logo' src="/public/wblogo.jpg" alt="" /> </h2>    
              <h2 className='product_name'>{product.productName}</h2>
              <div className='rating-read'>
              <h2 className='rating-value' >{product.stars.toFixed(1)}</h2>
              <Rating defaultValue={product.stars} precision={0.1} readOnly/>
              <h2 className='reviews'>({product.reviews})</h2>
              </div>
              <Button className="buttonbuy"
            variant="contained"
            >
            Доставим {product.date}
      </Button>
             </CardContent>
              </NavLink>  
              </Card>
          
          )}
          </div>
          </div>
        </>
    );
}