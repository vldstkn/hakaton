import { useParams } from 'react-router-dom';
import './productPage.css'
import { Button } from '@mui/material';
import { useState } from 'react';

// ProductPageProps пример параметров компонента. 
// Для использования ProductPage() меняем на ProductPage(props: ProductPageProps) 
// и обращаемся к перменной props уже внутри компонента
// type ProductPageProps = {
//     productN: number;
// };

export default function ProductPage() {
    //Получение идентификатора товара из url
    const { id } = useParams();
    const [count, setCount] = useState(0)

    return (
    <div className="productPage">
    <h1>Страница товара {id} </h1>
    <div>
      Пример рандомной кнопки 
      <Button  className='button' onClick={() => setCount((count) => count + 1)} variant="contained">{count}</Button>
      </div>
    </div>
    )
  }