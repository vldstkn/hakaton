import { TextField } from '@mui/material';
import './Profile.css'
import { useState } from 'react';

export default function Profile() {
    const userinfo = [
        {name: 'Анастасия',login: 'login1' },   
      ]
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