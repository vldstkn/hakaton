import { useParams } from 'react-router-dom';
import './productPage.css'
import { Button, Paper, Rating } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Star } from '@mui/icons-material';
export default function ProductPage() {
    //Получение идентификатора товара из url
    const { id } = useParams();
    const elems = [
      {productId: 1, productName: 'РуФон 16 Про Макс', stars: 5, price: `16500`,reviews: '12', favorite: 'false' ,description: 'Функциональный аэрогриль КТ-2250 может использоваться как аэрогриль, аэрофритюрница, а также как духовка. Позволяет готовить несколько блюд одновременно с', src:'https://www.wildberries.ru/catalog/260849114/detail.aspx'},
      {productId: 2, productName: 'Кепка ободранная', stars: 4.6, price: '900',reviews: '12', favorite: 'false',description: 'Функциональный аэрогриль КТ-2250 может использоваться как аэрогриль, аэрофритюрница, а также как духовка. Позволяет готовить несколько блюд одновременно с', src:'https://www.wildberries.ru/catalog/260849114/detail.aspx'},
      {productId: 3, productName: 'Кончилось', stars: 2, price: '4444',reviews: '12', favorite: 'false',description: 'Функциональный аэрогриль КТ-2250 может использоваться как аэрогриль, аэрофритюрница, а также как духовка. Позволяет готовить несколько блюд одновременно с', src:'https://www.wildberries.ru/catalog/260849114/detail.aspx'},

    ]

    const product = elems.find(x=>x.productId === Number(id))!;

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
          <h1 className='product_name'>{product.productName}</h1>
        <div className='rating-read'>
              <Star className="star-icon" />
              <h2 className='rating-value' >{product.stars.toFixed(1)}</h2>
              <h2 className='reviews'>({product.reviews})</h2>
        </div>
        <div className="prAbout">
              <h3 className="about">Описание</h3>
              <h4 className="description">{product.description}</h4>
        </div> 
        <h1 className="prPrice">{product.price}</h1> 
        <div className="prPriceButton">
          <div className="buttonContainer">
            <Button className="buttonbuy"
            target="_blank"
            href = {product.src}
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