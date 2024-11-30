import { useParams } from 'react-router-dom';
import './productPage.css'
import { Button, Paper, Rating } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarBorderIcon from '@mui/icons-material/StarBorder';
export default function ProductPage() {
    //Получение идентификатора товара из url
    const { id } = useParams();
    const elems = [
      {productId: 1, productName: 'РуФон 16 Про Макс', stars: 5, price: `16500`,reviews: '12', favorite: 'false' },
      {productId: 2, productName: 'Кепка ободранная', stars: 4.6, price: '900',reviews: '12', favorite: 'false'},
      {productId: 3, productName: 'Кончилось', stars: 2, price: '4444',reviews: '12', favorite: 'false'},
  
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
                }}
            />
      </div>
    <div className="productCard">
    <div className="title_name">
      <h1 className='product_name'>{elem.productName}</h1>
      <h1 className="prPrice">{elem.price}</h1>
    </div>
    <div className='rating-read'>
              <StarBorderIcon className="star-icon" />
              <h2 className='rating-value' >{elem.stars.toFixed(1)}</h2>
              <h2 className='reviews'>({elem.reviews})</h2>
              </div>
      <div className="prAbout"> <h3>Описание товара</h3></div>  
      <div className="prPriceButton">
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