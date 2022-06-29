import React from "react";
import style from './window.module.css'

const Modal = ({active,setActive,children}) => {
    return (
        <div className={active? `${style.modal} ${style.active}`: style.modal} onClick={()=>setActive(false)}>
            <div className={active? `${style.content} ${style.active}`: style.content} onClick={e=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default Modal