import React from "react";
import style from "./registration.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchRegister } from "../../store/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm({});

  const onSubmit = async (values) => {
    console.log("tap");
    const data = await dispatch(fetchRegister(values));
    console.log(data);
    if (data.error) {
      setError("email", {
        type: "custom",
        message: data.payload.response.data.message,
      });
      toast("Введенные данные не коректны!");
    } else {
      toast("Регестрация прошла успешно!");
    }
  };

  return (
    <>
      {isAuth !== null ? (
        !isAuth ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={style.register}>
                <div className={style.register__container}>
                  <h1>Регистарция!</h1>
                  <div className={style.register__inputSection}>
                    <label className={style.register__lable} htmlFor="fullName">
                      Введите ваше имя
                    </label>
                    <input
                      className={style.register__input}
                      placeholder="Имя"
                      {...register("fullName", {
                        required: "Поле обязательно к заполнению!",
                      })}
                    />
                  </div>
                  <div className={style.register__error}>
                    {errors?.fullName && (
                      <p>{errors?.fullName?.message || "Error"}</p>
                    )}
                  </div>

                  <div className={style.register__inputSection}>
                    <label className={style.register__lable} htmlFor="email">
                      Укажите вашу почту
                    </label>
                    <input
                      className={style.register__input}
                      placeholder="email"
                      {...register("email", {
                        required: "Поле обязательно к заполнению!",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Данные введенны не коректно!",
                        },
                      })}
                    />
                  </div>
                  <div className={style.register__error}>
                    {errors?.email?.message}
                  </div>

                  <div className={style.register__inputSection}>
                    <label className={style.register__lable}>
                      Введите пароль
                    </label>
                    <input
                      className={style.register__input}
                      type="password"
                      placeholder="Пароль"
                      {...register("password", {
                        required: "Поле обязательно к заполнению!",
                        minLength: {
                          value: 6,
                          message: "Минимум 6 символов!",
                        },
                        maxLength: {
                          value: 40,
                          message: "Максимум 40 символов!",
                        },
                      })}
                    />
                  </div>
                  <div className={style.register__error}>
                    {errors?.password && (
                      <p>{errors?.password?.message || "Error"}</p>
                    )}
                  </div>

                  <div className={style.register__inputSection}>
                    <label className={style.register__lable}>
                      Подтвердите пароль
                    </label>
                    <input
                      className={style.register__input}
                      type="password"
                      placeholder="Пароль"
                      {...register("passwordConfirm", {
                        required: "Поле обязательно к заполнению!",
                        validate: (value) => {
                          if (watch("password") != value) {
                            return "Пароли не совпадают!";
                          }
                        },
                      })}
                    />
                  </div>
                  <div className={style.register__error}>
                    {errors?.passwordConfirm && (
                      <p>{errors?.passwordConfirm?.message || "Error"}</p>
                    )}
                  </div>

                  <input
                    type="submit"
                    value="Отправить"
                    className={style.register__submit}
                    // disabled={!isValid}
                  />
                </div>
              </div>
            </form>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </>
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <></>
      )}
    </>
  );
};
