import React from "react";
import style from "../Registration/registration.module.scss";

export const Confirm = ({onDialog}) => {
   return(
    <div>
        <button className={style.register__submit} onClick={()=>onDialog(true)}>Yes</button>
        <button className={style.register__submit} onClick={()=>onDialog(false)}>No</button>
    </div>
   )
};
