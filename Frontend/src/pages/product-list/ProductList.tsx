import { NavLink } from 'react-router-dom';
import './productList.css'
import { Card, CardContent } from '@mui/material';

export default function ProductList() {
  const products = [{productId: 1, productName: 'name 1'},{productId: 2, productName: 'name 2'},{productId: 3, productName: 'name 3'}]

    return (
      <>
        <h1>Главная страница</h1>
        <div className='list'>
            {products.map((product) => 
            <Card key={product.productId}> 
              <CardContent>
                        <NavLink to={`/product/${product.productId}`}>Ccылка на товар {product.productId}</NavLink>
                <h2>{product.productName}</h2>
                </CardContent>
              </Card>
            
          )}
          </div>
       </>
      
    )
  }