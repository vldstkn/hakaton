import { useState } from 'react'
import styles from './AuthPage.module.css'
import { useForm, SubmitHandler  } from 'react-hook-form'
import toast from 'react-hot-toast'

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
        <div className={styles['form-wrap']}>
            <h2 className={styles['title']}>Авторизация</h2>
            <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles['input']} placeholder='email' type='email' {...register("email", { required: true })}/>
                <input className={styles['input']} placeholder='password' type='password' {...register("password", { required: true })}/>
                {!isLogin && <input className={styles['input']} placeholder='name' type='text' {...register("name", { required: true })}/>}
                <button className={styles['button']}>{isLogin ? "войти" : "создать"}</button>
                {errors.email && <span className={styles['error']}>Почта обязательна!</span>}
                {errors.password && <span className={styles['error']}>Пароль обязательна!</span>}
                {errors.name && <span className={styles['error']}>Имя обязательно!</span>}
            </form>
            <button className={styles['btn-set-type']} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "зарегестрироваться" : "войти"}
            </button>
        </div>
    </div>
}