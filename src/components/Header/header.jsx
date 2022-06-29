import React, { useState } from "react";
import style from "./header.module.scss"
import { Link } from 'react-router-dom'
import Modal from "../moduleWindow/window";
import Login from "../../pages/Login/login";

import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/slices/authSlice";

export const Header = () => {
    const [modalActive, setModalActive] = useState(false)

    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth)
    const data = useSelector((state) => state.auth.data)
    
    const onClickLogout = () => {
        if (window.confirm('Вы действиельно хотите выйти?')) {
            dispatch(logout())
            window.localStorage.removeItem('token')
        }
    };

    return (
        <div className={style.header}>
            <div className={style.header__container}>
                <div className={style.logo}>
                    СобираемБаБки.ru (-_-)
                </div>
                {!isAuth ? (
                    <>
                        <div className={style.auth}>
                            <Link to='/register'>
                                <div className={style.auth__register}>Registration</div>
                            </Link>
                            <a>
                                <div className={style.auth__logIn} onClick={() => setModalActive(true)}>LogIn</div>
                            </a>
                        </div>
                        <Modal active={modalActive} setActive={setModalActive}><Login /></Modal>
                    </>
                ) :
                    <div className={style.auth}>
                        <Link to='/user'>
                            <img className={style.auth__img} src="./icon/user.png" alt="user" />
                        </Link>
                        <a>
                            <div className={style.auth__logIn} onClick={onClickLogout}>LogOut</div>
                        </a>
                    </div>
                }
            </div>
        </div>
    )
}


