import { Card, CardContent, Rating, Button, Checkbox, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './FavoritesPage.css'
import { useEffect, useState } from 'react';
import { Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';


interface IProduct{ 
  id : number; 
  price: number; 
  name: string; 
  rating: number; 
  numberReviews: number; 
  link: string; 
  updatedAt: string;   
} 

export default function FavoritesPage() {
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
  
  const handleCheckboxChange = (product: IProduct) => {
    // Отправка данных о товаре в базу данных
    fetch('http://localhost:5987/api/gateway/product/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: product.id }), // Отправляем только id товара
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
    return (
        <>
        <h1 className='head'>Избранное</h1>
        <div className='boxfv' >
          <div className='list'>
            {products.map((product) => 
            <Card className='product' key={product.id}> 
              <CardContent className="cardContent">
              <NavLink to={`/product/${product.id}`}>
              <Box sx={{ position: 'relative'}}>
              <img className='img_product' src={`/product_${product.id}.jpg`} />  
              <Checkbox
                icon={<Favorite />}
                checkedIcon={<FavoriteBorder />}
                onChange={() => handleCheckboxChange(product)}
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
              endIcon={<ShoppingCart/>}
              >
              Доставим {product.updatedAt} 
              </Button>
               
             </CardContent>
              </Card>
            )}
          </div>
        </div>
        </>
    );
  };
