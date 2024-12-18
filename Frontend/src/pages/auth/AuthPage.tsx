import { useState } from 'react';
import styles from './AuthPage.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

type AuthForm = {
    email: string;
    password: string;
    name?: string;
};

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthForm>({
        mode: "onSubmit"
    });

    const navigate = useNavigate(); // Инициализируем useNavigate

    const onSubmit: SubmitHandler<AuthForm> = data => {
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
        console.log("The data is being sent", data);
        toast.success("Отправлено");
        reset();
        
        // Здесь вы можете добавить логику для проверки авторизации
        // Например, если авторизация успешна, то:
        if (isLogin) {
            // Логика для авторизации пользователя
            // После успешной авторизации:
            navigate('/profile'); // Перенаправление на страницу профиля
        } else {
            // Логика для регистрации пользователя
            // После успешной регистрации, возможно, тоже перенаправить на профиль:
            navigate('/profile'); // Или куда вам нужно после регистрации
        }
    };

    return (
        <div className={styles['page']}>
            <h2 className={styles['title']}>{isLogin ? "Авторизация" : "Регистрация"}</h2>
            <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                <TextField className={styles['input']} id="standard-basic" label="email" variant="standard" type='email' {...register("email", { required: true })} />
                <TextField className={styles['input']} id="standard-basic" label="password" variant="standard" type='password' {...register("password", { required: true })} />
                {!isLogin && <TextField className={styles['input']} id="standard-basic" variant="standard" label='name' type='text' {...register("name", { required: true })}/>}
                <button className={styles['button']}>{isLogin ? "войти" : "создать"}</button>
                {(errors.email || errors.password || errors.name) && <span className={styles['error']}>Все поля обязательны для заполнения</span>}
            </form>
            <button className={styles['btn-set-type']} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "зарегестрироваться" : "войти"}
            </button>
        </div>
    );
}