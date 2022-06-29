import React from "react";

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { fetchAuth } from "../../store/slices/authSlice";
import style from '../Registration/registration.module.scss'

const Login = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.auth.isAuth)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm({
        mode: "onBlur"
    })

    const validateEmail = (value) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (value === '') {
            return true
        }
        if (!re.test(value)) {
            return false
        }
        return true
    }

    const onSubmit = async (values) => {
        console.log('tap')
        const data = await dispatch(fetchAuth(values))
        if (!data.payload) {
            return alert('Введенные данные не коректны!')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
            reset()
        }
    }

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.register__container}>
                <h1>Войти</h1>
                <div className={style.register__inputSection}>
                    <label className={style.register__lable} htmlFor="email">Укажите вашу почту</label>
                    <input className={style.register__input} placeholder="true"
                        {...register('email', {
                            required: "Поле обязательно к заполнению!",
                            validate: value => validateEmail(value),
                        })}
                    />
                    <div className={style.register__error}>{errors?.email && <p>{'Введенные даные не валидны'}</p>}</div>
                </div>

                <div className={style.register__inputSection}>
                        <label className={style.register__lable} >Введите пароль</label>
                        <input className={style.register__input}  type="password" placeholder="true"
                            {...register('password', {
                                required: "Поле обязательно к заполнению!",
                            })}
                        />
                        <div className={style.register__error}>{errors?.password && <p>{errors?.password?.message || 'Error'}</p>}</div>
                    </div>
                <input type="submit"  value="Отправить" className={style.register__submit} disabled={!isValid}/>
            </div>
        </form>
    )
}
export default Login