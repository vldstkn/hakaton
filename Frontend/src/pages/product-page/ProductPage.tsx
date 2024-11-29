import { useParams } from 'react-router-dom';
import './productPage.css'
import { Button, Paper } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ProductPage() {
    //Получение идентификатора товара из url
    const { id } = useParams();
    const elems = [
      {productId: 1, productName: 'РуФон 16 Про Макс', stars: 5, price: `16500`,reviews: '12' },
      {productId: 2, productName: 'Кепка ободранная', stars: 4.6, price: '900',reviews: '12'},
      {productId: 3, productName: 'Кончилось', stars: 2, price: '4444',reviews: '12'},
  
    ]

    const elem = elems.find(x=>x.productId === Number(id))!;

    return (
    <div className="productPage">
    <div className="carousel">
          <img
                src={`/product_${id}.jpg`}
                style={{
                    maxWidth: '100%',
                    height:'100%',
                    // width: '100%', // Задаем ширину 100% от родительского элемента
                    // height: '100%', // Задаем высоту 100% от родительского элемента
                    // objectFit: 'cover', // Масштабируем изображение, сохраняя его пропорции
                }}
            />
      </div>
    <div className="productCard">
    <h1 className='product_name'>{elem.productName}</h1>
      <div className="prAbout"> <h3>Описание товара</h3></div>  
      <div className="prPriceButton">
      <div className="prPrice"><h3>{elem.price}</h3></div>
      <div className="buttonContainer">
        <Button className="buttonbuy"
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