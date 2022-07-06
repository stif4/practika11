import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleRedirect } from "../../store/slices/authSlice";

export const Home = () => {
  const redirect = useSelector((state) => state.auth.isRedirect);
  //const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const wasAuthorised = useSelector((state) => state.auth.itWasAuthorised);

  setTimeout(() => {
    if (redirect&&!wasAuthorised) {
      toast("ЧЕЛ ЗАЛОГИНСЯ ПЖ, ЧЕ КАК ЛОХ!");
      dispatch(toggleRedirect(false));
    }
  }, 0);

  return (
    <>
      <div>Home!</div>
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
