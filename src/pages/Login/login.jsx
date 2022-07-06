import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchAuth } from "../../store/slices/authSlice";
import style from "../Registration/registration.module.scss";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({
    mode: "onBlur",
    defaultValues: {
        email: "vanva44@gmail.com",
        password: "123456"
      }
  });

  const validateEmail = (value) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === "") {
      return true;
    }
    if (!re.test(value)) {
      return false;
    }
    return true;
  };

  const onSubmit = async (values) => {
    console.log("tap");
    const data = await dispatch(fetchAuth(values));
    console.log(data);
    if (data.error) {
      //return alert("Введенные данные не коректны!");
      toast("Введенные данные не коректны!")
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.register__container}>
          <h1>Войти</h1>
          <div className={style.register__inputSection}>
            <label className={style.register__lable} htmlFor="email">
              Укажите вашу почту
            </label>
            <input
              className={style.register__input}
              placeholder="email"
              {...register("email", {
                required: "Поле обязательно к заполнению!",
                validate: (value) => validateEmail(value),
              })}
            />
            <div className={style.register__error}>
              {errors?.email && <p>{"Введенные даные не валидны"}</p>}
            </div>
          </div>

          <div className={style.register__inputSection}>
            <label className={style.register__lable}>Введите пароль</label>
            <input
              className={style.register__input}
              type="password"
              placeholder="password"
              {...register("password", {
                required: "Поле обязательно к заполнению!",
              })}
            />
            <div className={style.register__error}>
              {errors?.password && (
                <p>{errors?.password?.message || "Error"}</p>
              )}
            </div>
          </div>
          <input
            type="submit"
            value="Отправить"
            className={style.register__submit}
          />
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
  );
};
export default Login;
