import React from 'react';
import './Footer.css'; // Ваши стили для приложения

function Footer() {
    return (
       <>
       <div className='footer'>
       <div className='gridContainer'>
       <div className='gridItem3'>
        <h3>EasyMart</h3>
        <h4>Связь с нами</h4>
        <div>
                <a href='https://vk.com/idzdtthn' target="_blank"><img className='imgF' src='/public/vk.png'/></a>
                <a href='https://web.telegram.org/k/#@kkkyyycccbbb' target="_blank"><img className='imgF' src='/public/tg.png'/></a>
                <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSMVJRhbmcTlqGlnFvJflbgrnjrDckbkTRwJHfvMHQmvtmTNtPpTjTWcLBfghzhcDsTvsNWW" target="_blank"><img className='imgF' src='/public/mail.png'/></a>
        </div>
       </div>   
       <div className='gridItem'>
        В разработке участвовали:
        <ul>
                <li>Соловьев Вячеслав</li>
                <li>Сатукин Владислав</li>
                <li>Бахтин Роман</li>
                <li>Кужелев Михаил</li>
                <li>Киселева Анастасия</li>
                <li>Сидоркин Иван</li>
            
        </ul>
       </div>
       <div className='gridItem'>
        Это Проект команды MFS специально для Cookie Fest на площадке  Школа 21. Мы помогаем конечному пользователю находить самые выгодные предложения.
       </div>
       
       </div>
       <hr/>
       <p id="copyright" className="copyright">
                &copy; MFS EasyMart 2024
            </p>
       </div>
       </>
    );
}

export default Footer;