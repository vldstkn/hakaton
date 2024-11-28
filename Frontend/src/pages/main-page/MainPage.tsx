import { NavLink } from 'react-router-dom';
import './MainPage.css'
import { Card, CardContent, Rating, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

export default function MainPage() {
  const [rec1, set1] = useState(true)
  const [rec2, set2] = useState(false)
  const productsrec = [
    {productId: 1, productName: 'РуФон 16 Про Макс', stars: 5, price: `16500` },
    {productId: 2, productName: 'Кепка ободранная', stars: 4.6, price: '900'},
    {productId: 3, productName: 'Кончилось', stars: 2, price: '4444'},

  ]
  const productsrand = [
    {productId: 4, productName: 'name 4', stars: 2, price: '1234'},
    {productId: 5, productName: 'name 5', stars: 3, price: '9999'},
    {productId: 6, productName: 'name 6', stars: 4, price: '12999'},
    {productId: 7, productName: 'name 7', stars: 2.6, price: '13456'},
    {productId: 8, productName: 'name 8', stars: 1, price: '6'},
    {productId: 9, productName: 'name 9', stars: 2, price: '13'},
    {productId: 10, productName: 'name 10', stars: 3, price: '29'},
    {productId: 11, productName: 'name 11', stars: 4, price: '2999999999'},
    {productId: 12, productName: 'name 12', stars: 5, price: '10'},

  ]
  const products = rec1? productsrec : productsrand;
    return (
      <>
        <div className='main_button' >
        <ToggleButtonGroup>
          <ToggleButton id="btn" value="rec" sx={{backgroundColor:rec1? 'rgb(192, 254, 254)':'white'}} onClick={() => {set1(true); set2(false)} }>Мои рекомендации</ToggleButton> 
          <ToggleButton id="btn" value="new" sx={{backgroundColor:rec2? 'rgb(192, 254, 254)':'white'}} onClick={() => {set1(false); set2(true)}}>Хочу что-то новое</ToggleButton>
        </ToggleButtonGroup> {/* Эти кнопки будут выводится если пользователь авторизован */}

        </div>
        <div className='box' >
          <div className='list'>
            {products.map((product) => 
            <Card className='product' key={product.productId}> 
              <NavLink to={`/product/${product.productId}`}>
              <CardContent>
              <img className='img_product' src={`/product_${product.productId}.jpg`} />        
              <h2 className='product_name'>{product.productName}</h2>
              <h2 className='price'>{product.price}</h2>
              <Rating className="rating-read" defaultValue={product.stars} precision={0.1} readOnly />
              <h3 className='description'> Описание товара Описание товара Описание товара Описание товара Описание товара Описание товара Описание товара</h3>
              </CardContent>
              

              </NavLink>  
              </Card>
          
          )}
          </div>
          </div>
       </>
      
    )
  }