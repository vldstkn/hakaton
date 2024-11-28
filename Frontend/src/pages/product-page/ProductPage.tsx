import { useParams } from 'react-router-dom';
import './productPage.css'
import { Button } from '@mui/material';
import { useState } from 'react';



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