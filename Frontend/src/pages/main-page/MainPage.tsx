import { NavLink } from 'react-router-dom';
import './MainPage.css'
import { Box, Button, Checkbox, CircularProgress } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Card, CardContent, Rating, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

interface IProduct{
  id : number;
  price: number;
  name: string;
  rating: number;
  numberReviews: number;
  link: string;
  updatedAt: string;  
}
export default function MainPage() {
  const [rec1, set1] = useState(true)
  const [rec2, set2] = useState(false)

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
     fetch('http://localhost:5987/api/gateway/product/all')
        .then((res) => res.json())
        .then((data) => {
           console.log(data);
           setProducts(data.products);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);

  if (!products) {
    return <div className="loading"><CircularProgress /></div>; 
  }
  const productsrand = [
    {productId: 10, productName: 'name 4', stars: 2, price: '1234',reviews: '12',date: '12 Декабря',description: 'Функциональный аэрогриль КТ-2250 может использоваться как аэрогриль, аэрофритюрница, а также как духовка. Позволяет готовить несколько блюд одновременно с', src:'https://www.wildberries.ru/catalog/260849114/detail.aspx' },
    {productId: 11, productName: 'name 5', stars: 3, price: '9999',reviews: '12',date: '12 Декабря',description: 'Функциональный аэрогриль КТ-2250 может использоваться как аэрогриль, аэрофритюрница, а также как духовка. Позволяет готовить несколько блюд одновременно с', src:'https://www.wildberries.ru/catalog/260849114/detail.aspx' },
   
  ]
  //const products = rec1? productsrec : productsrand;
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
            <Card className='product' key={product.id}> 
              <CardContent className="cardContent">
              <NavLink to={`/product/${product.id}`}>
              <Box sx={{ position: 'relative'}}>
              <img className='img_product' src={`/product_${product.id}.jpg`} />              
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
              <h2 className='product_name'>{product.name}</h2>
              <div className='rating-read'>
              <h2 className='rating-value' >{product.rating.toFixed(1)}</h2>
              <Rating defaultValue={product.rating} precision={0.1} readOnly/>
              <h2 className='reviews'>({product.numberReviews})</h2>
              </div>
              </NavLink>  
              <Button className="buttonbuy"
              target="_blank"
              href = {product.link}
              variant="contained"
              endIcon={<ShoppingCartIcon />}>
              Доставим {product.updatedAt}
              </Button>
              </CardContent>
            </Card>         
            )}
          </div>
        </div>
       </>     
    )
  }