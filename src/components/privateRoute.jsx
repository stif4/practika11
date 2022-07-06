import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toggleRedirect } from "../store/slices/authSlice";

export const PrivateRoute = ({ component: Component, ...res }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  if (isAuth === null) {
    return <></>;
  } else if (isAuth) {
    return <Component {...res} />;
  } else {
    dispatch(toggleRedirect(true));
    return <Navigate to="/" />;
  }

  //
  //   return isAuth !== null ? (
  //     isAuth ? (
  //       <Component {...res} />
  //     ) : (
  //       <Navigate to="/" />
  //     )
  //   ) : (
  //     <></>
  //   );
};
