import React from "react";
import style from "./registration.module.scss"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { fetchRegister } from "../../store/slices/authSlice";

export const Registration = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.auth.isAuth)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid }
    } = useForm({
        mode: 'all'
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

        const data = await dispatch(fetchRegister(values))
        debugger
        if (!data.payload) {
            //console.log(data)
            return alert('Не удалось зарегистрироваться!')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
            reset()
        }
       
    }

    if (isAuth){
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.register}>
                <div className={style.register__container}>
                    <h1>Регистарция!</h1>
                    <div className={style.register__inputSection}>
                        <label className={style.register__lable} htmlFor="fullName">Введите ваше имя</label>
                        <input className={style.register__input}
                            {...register('fullName', {
                                required: "Поле обязательно к заполнению!",
                            })}
                        />
                        <div className={style.register__error}>{errors?.fullName && <p>{errors?.fullName?.message || 'Error'}</p>}</div>
                    </div>

                    <div className={style.register__inputSection}>
                        <label className={style.register__lable} htmlFor="email">Укажите вашу почту</label>
                        <input className={style.register__input}
                            {...register('email', {
                                required: "Поле обязательно к заполнению!",
                                validate: value => validateEmail(value),
                            })}
                        />
                        <div className={style.register__error}>{errors?.email && <p>{'Введенные даные не валидны!'}</p>}</div>
                    </div>

                    <div className={style.register__inputSection}>
                        <label className={style.register__lable} >Введите пароль</label>
                        <input className={style.register__input} type="password"
                            {...register('password', {
                                required: "Поле обязательно к заполнению!",
                                minLength: {
                                    value: 6,
                                    message: "Минимум 6 символов!"
                                },
                                maxLength: {
                                    value: 40,
                                    message: "Максимум 40 символов!"
                                }
                            })}
                        />
                        <div className={style.register__error}>{errors?.password && <p>{errors?.password?.message || 'Error'}</p>}</div>
                    </div>

                    <div className={style.register__inputSection}>
                        <label className={style.register__lable} >Подтвердите пароль</label>
                        <input className={style.register__input} type="password"
                            {...register('passwordConfirm', {
                                required: "Поле обязательно к заполнению!",
                                validate: (value) => {
                                    if (watch('password') != value) {
                                        return "Пароли не совпадают!";
                                    }
                                },
                            })}
                        />
                        <div className={style.register__error}>{errors?.passwordConfirm && <p>{errors?.passwordConfirm?.message || 'Error'}</p>}</div>
                    </div>
                    <input type="submit" value="Отправить" className={style.register__submit} disabled={!isValid} />
                </div>
            </div>
        </form>
    )
}