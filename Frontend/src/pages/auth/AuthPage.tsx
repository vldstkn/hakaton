import { useState } from 'react'
import styles from './AuthPage.module.css'
import { useForm, SubmitHandler  } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button, TextField } from '@mui/material'

type AuthForm = {
    email: string
    password: string
    name?: string
}

export default function AuthPage(){
    const [isLogin, setIsLogin] = useState(true)
    const {register, handleSubmit, formState: { errors }, reset} = useForm<AuthForm>({
        mode: "onSubmit"
    })

    const onSubmit: SubmitHandler<AuthForm> = data => {
        console.log("The data is being sent", data)
        toast.success("Отправлено")
        reset()
    }


    return <div className={styles['page']}>
            <h2 className={styles['title']}>{isLogin ? "Авторизация" : "Регистрация"}</h2>
            <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
            <TextField className={styles['input']} id="standard-basic" label="email" variant="standard"  type='email' {...register("email", { required: true })} />
            <TextField className={styles['input']} id="standard-basic" label="password" variant="standard"  type='password' {...register("password", { required: true })} />
               {!isLogin && <TextField className={styles['input']} id="standard-basic" variant="standard" label='name' type='text' {...register("name", { required: true })}/>}
                <button className={styles['button']}>{isLogin ? "войти" : "создать"}</button>
                {(errors.email || errors.password || errors.name) && <span className={styles['error']}>Все поля обязательны для заполнения</span>}
            </form>
            <button  className={styles['btn-set-type']} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "зарегестрироваться" : "войти"}
            </button>
    </div>
}