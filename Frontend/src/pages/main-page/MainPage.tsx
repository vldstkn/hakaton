import { NavLink } from 'react-router-dom';
import './MainPage.css'
import { Box, Button, Checkbox } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Card, CardContent, Rating, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

export default function MainPage() {
  const [rec1, set1] = useState(true)
  const [rec2, set2] = useState(false)
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
              <CardContent className="cardContent">
              <Box sx={{ position: 'relative'}}>
              <img className='img_product' src={`/product_${product.productId}.jpg`} />              
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                onClick={(event) => event.stopPropagation()} 
                sx={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  top: '10px',
                  right: '10px',
                  color: 'gray', 
                  '&.Mui-checked': {
                    color: 'red', 
                  },
                  '&:hover': {
                    backgroundColor: 'white', 
                    opacity: 1,
                    transform: 'scale(1.2)', 
                  },
                  transition: 'transform 0.3s', 
                  zIndex: 1,
                }}
              />
              </Box>
              <h2><span className='price'>{product.price} </span> <img className='logo' src="/public/wblogo.jpg" alt="" /> </h2>      
              <h2 className='product_name'>{product.productName}</h2>
              <div className='rating-read'>
              <h2 className='rating-value' >{product.stars.toFixed(1)}</h2>
              <Rating defaultValue={product.stars} precision={0.1} readOnly/>
              <h2 className='reviews'>({product.reviews})</h2>
              </div>
              <Button className="buttonbuy"
              variant="contained"
              endIcon={<ShoppingCartIcon />}>
              Доставим {product.date}
              </Button>
              </CardContent>
              </NavLink>  
            </Card>         
            )}
          </div>
        </div>
       </>     
    )
  }