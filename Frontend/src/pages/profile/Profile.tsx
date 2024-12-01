
import { TextField } from '@mui/material';
import './Profile.css'
import { useState } from 'react';

export default function Profile() {
    const userinfo = [
        {name: 'Анастасия',login: 'login1' },   
      ]
       /* const [products, setPosts] = useState([]);

  useEffect(() => {
     fetch('http://localhost:5987/api/gateway/product/all')
        .then((res) => res.json())
        .then((data) => {
           console.log(data);
           setPosts(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []); */
    return (
    
    <div className="pageprofile">
    {userinfo.map((user) => 
    <>
        <h1 className="usname">{user.name}</h1>
        <TextField className="order"
                    id="outlined-basic"
                    defaultValue={user.login} // Получаем имя из первого элемента массива
                    variant="outlined"
                    slotProps={{
                        input: {
                          readOnly: true,
                        },
                    }}
                />
        <button className="outlog"> Выйти </button>
    </>
    
   
    )}
    </div>
)}
