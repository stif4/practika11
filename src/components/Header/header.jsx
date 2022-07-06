import React, { useState } from "react";
import style from "./header.module.scss";
import { Link } from "react-router-dom";
import Modal from "../moduleWindow/window";
import Login from "../../pages/Login/login";

import { useDispatch, useSelector } from "react-redux";
import { fetchLogout, toggleItWasAuthorised } from "../../store/slices/authSlice";
import { Confirm } from "../../pages/Confirm/confirm";

export const Header = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalActiveConfirm, setModalActiveConfirm] = useState(false);

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const onClickLogout = () => {
    setModalActiveConfirm(true);
    dispatch(toggleItWasAuthorised(true));
    setModalActive(false);
  };

  const areUSure = (choose) => {
    if (choose) {
      dispatch(fetchLogout());
      setModalActiveConfirm(false);
    } else {
      setModalActiveConfirm(false);
    }
  };

  return (
    <div className={style.header}>
      <div className={style.header__container}>
        <div className={style.logo}>СобираемБаБки.ru (-_-)</div>
        {isAuth !== null ? (
          !isAuth ? (
            <>
              <div className={style.auth}>
                <Link to="/register">
                  <div className={style.auth__register}>Registration</div>
                </Link>
                <a>
                  <div
                    className={style.auth__logIn}
                    onClick={() => setModalActive(true)}
                  >
                    LogIn
                  </div>
                </a>
              </div>
              <Modal
                active={modalActive}
                setActive={setModalActive}
              >
                <Login />
              </Modal>
            </>
          ) : (
            <>
              <div className={style.auth}>
                <Link to="/user">
                  <img
                    className={style.auth__img}
                    src="./icon/user.png"
                    alt="user"
                  />
                </Link>
                <a>
                  <div className={style.auth__logIn} onClick={onClickLogout}>
                    LogOut
                  </div>
                </a>
              </div>
            </>
          )
        ) : (
          <></>
        )}
      </div>
      <Modal
        active={modalActiveConfirm}
        setActive={setModalActiveConfirm}
      >
        <Confirm onDialog={areUSure} />
      </Modal>
    </div>
  );
};
