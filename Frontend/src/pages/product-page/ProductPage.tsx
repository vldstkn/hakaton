import { useParams } from 'react-router-dom';
import './productPage.css'
import { Button, CircularProgress, Paper, Rating } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Star } from '@mui/icons-material';
import { useEffect, useState } from 'react';

interface IProduct{
  id : number;
  price: number;
  name: string;
  rating: number;
  numberReviews: number;
  link: string;
  updatedAt: string;  
}
export default function ProductPage() {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<IProduct | null>(null); 

  useEffect(() => {
    fetch(`http://localhost:5987/api/gateway/product/all`) 
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
       
        setProduct(data.products); // Устанавливаем продукт в состояние
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]); // Зависимость от id

  if (!product) {
    return <div className="loading"><CircularProgress color="secondary" /></div>; 
  }
  
    return (
    <div className="productPage">
      <div className="carousel">
          <img
                src={`/product_{id}.jpg`}
                style={{
                    maxWidth: '100%',
                    height:'100%',
                }}
            />
      </div>

      <div className="productCard">
          <h1 className='product_name'>{product.name ? product.name: 'Нет имени'}</h1>
        <div className='rating-read'>
              <Star className="star-icon" />
              <h2 className='rating-value' >{product.rating ? product.rating.toFixed(1) : 'Нет рейтинга'}</h2>
              <h2 className='reviews'>({product.numberReviews})</h2>
        </div>
        <div className="prAbout">
              <h3 className="about">Описание</h3>
              <h4 className="description">{product.name}</h4>
        </div> 
        <h1 className="prPrice">{product.price}</h1> 
        <div className="prPriceButton">
          <div className="buttonContainer">
            <Button className="buttonbuy"
            target="_blank"
            href = {product.link}
            variant="contained"
            endIcon={<CreditCardIcon />}>
            Купить сейчас
            </Button>
           <Button className="buttoncart"
            variant="contained"
            endIcon={<FavoriteIcon />}>
            Добавить в избранное
            </Button>
          </div>
        </div>
      </div>
      
    </div>
    )
  }