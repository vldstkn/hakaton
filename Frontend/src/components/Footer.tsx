import React from 'react';
import './Footer.css'; // Ваши стили для приложения

function Footer() {
    return (
       <>
       <div className='footer'>
       <div className='container'><h1>EasyMart</h1></div>
       <div className='footGrid'>
            <ul> Мы в социальных сетях
                <li className='srcVk'><img className='imgVk' src={`/vk.png`} /> Вконтакте</li>
                <li>Телеграм</li>
            </ul>
       </div>
       </div>
       </>
    );
}

export default Footer;