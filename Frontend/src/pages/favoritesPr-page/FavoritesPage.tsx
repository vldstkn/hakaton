import { Card, CardContent, Rating, Button, Checkbox, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './FavoritesPage.css'
import { useState } from 'react';
import { Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';

export default function FavoritesPage() {
    const [rec1, set1] = useState(true)
    const productsrec = [
      {productId: 1, productName: 'РуФон 16 Про Макс', stars: 5.0, price: `16500`,reviews: '12', date: '12 Декабря' ,description: 'Функциональный аэрогриль КТ-2250 может использоваться как аэрогриль, аэрофритюрница, а также как духовка. Позволяет готовить несколько блюд одновременно с', src:'https://www.wildberries.ru/catalog/260849114/detail.aspx' },
      {productId: 2, productName: 'Кепка ободранная', stars: 4.6, price: '900',reviews: '12',date: '12 Декабря',description: 'Функциональный аэрогриль КТ-2250 может использоваться как аэрогриль, аэрофритюрница, а также как духовка. Позволяет готовить несколько блюд одновременно с', src:'https://www.wildberries.ru/catalog/260849114/detail.aspx' },
      {productId: 3, productName: 'Кончилось', stars: 2.0, price: '4444',reviews: '12',date: '12 Декабря',description: 'Функциональный аэрогриль КТ-2250 может использоваться как аэрогриль, аэрофритюрница, а также как духовка. Позволяет готовить несколько блюд одновременно с', src:'https://www.wildberries.ru/catalog/260849114/detail.aspx' },
  
    ]
    const productsrand = [
      {productId: 4, productName: 'name 4', stars: 2, price: '1234',reviews: '12',date: '12 Декабря',description: 'Функциональный аэрогриль КТ-2250 может использоваться как аэрогриль, аэрофритюрница, а также как духовка. Позволяет готовить несколько блюд одновременно с', src:'https://www.wildberries.ru/catalog/260849114/detail.aspx' },
      {productId: 5, productName: 'name 5', stars: 3, price: '9999',reviews: '12',date: '12 Декабря',description: 'Функциональный аэрогриль КТ-2250 может использоваться как аэрогриль, аэрофритюрница, а также как духовка. Позволяет готовить несколько блюд одновременно с', src:'https://www.wildberries.ru/catalog/260849114/detail.aspx' },
     
    ]
      const products = rec1? productsrec : productsrand;
    return (
        <>
        <h1 className='head'>Избранное</h1>
        <div className='boxfv' >
          <div className='list'>
            {products.map((product) => 
            <Card className='product' key={product.productId}> 
              <CardContent className="cardContent">
              <NavLink to={`/product/${product.productId}`}>
              <Box sx={{ position: 'relative'}}>
              <img className='img_product' src={`/product_${product.productId}.jpg`} />  
              <Checkbox
                icon={<Favorite />}
                checkedIcon={<FavoriteBorder />}
                onClick={(event) => event.stopPropagation()} 
                sx={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  top: '10px',
                  right: '10px',
                  color: 'red', 
                  '&.Mui-checked': {
                    color: 'gray', 
                  },
                  '&:hover': {
                    backgroundColor: 'white', 
                    opacity: 1,
                    transform: 'scale(1.2)', 
                  },
                  transition: 'transform 1.3s', 
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
              </NavLink>
              <Button className="buttonbuy"
              target="_blank"
              href = {product.src}
              variant="contained"
              endIcon={<ShoppingCart/>}
              >
              Доставим {product.date} 
              </Button>
               
             </CardContent>
              </Card>
            )}
          </div>
        </div>
        </>
    );
}