import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostSubscribers,
  updatePost,
  userPost,
  userPostDelete,
  userPostSubscribe,
  userPostUpdate,
} from "../../store/slices/postSlice";
import style from "./userPost.module.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchAuthCheck } from "../../store/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Confirm } from "../Confirm/confirm";
import Modal from "../../components/moduleWindow/window";

export const UserPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.userPost);
  const postSubscribers = useSelector((state) => state.post.subscribers);
  const [change, setChange] = useState(false);
  const { role, _id } = useSelector((state) => state.auth.data.data._doc);

  const [modalActiveConfirm, setModalActiveConfirm] = useState(false);

  const areUSure = (choose) => {
    if (choose) {
      setModalActiveConfirm(false);
      dispatch(userPostDelete(id))
      toast('Пост удален!')
      return <Navigate to="/"/>;
    } else {
      setModalActiveConfirm(false);
    }
  };


  console.log(postSubscribers);

  useEffect(() => {
    dispatch(userPost(id));
    dispatch(getPostSubscribers(id));
  }, []);

  const saveChange = () => {
    if (post.text === "" || post.title === "" || post.tegs === "") {
      return toast("Заполните все поля!");
    } else {
      const params = {
        id: id,
        post: post,
      };
      dispatch(userPostUpdate(params));
      setChange(false);
      return toast("Пост изменен!");
    }
  };

  const update = (value, field) => {
    const postCopy = JSON.parse(JSON.stringify(post));
    postCopy[field] = value;
    dispatch(updatePost(postCopy));
  };

  const deletePost = ()=>{
    setModalActiveConfirm(true);
  }

  const subscribe=()=>{
    let sub = false
    postSubscribers.forEach(element => {
      element.forEach(element=>{
        if(element._id ===_id){
          sub = true
          return toast('Вы уже подписаны!')
        }
      })
    });
    if(!sub){
      dispatch(userPostSubscribe(id))
      return toast('Вы успешно подписались!')
    }
  }

  return (
    <div className={style.post}>
      <div className={style.post__container}>
        {post ? (
          <>
            {change ? (
              <input
                className={`${style.post__inputTitle}`}
                type="text"
                placeholder="Тема поста"
                value={post.title}
                onChange={(e) => update(e.target.value, "title")}
              />
            ) : (
              <h1 className={style.post__title}>{post.title}</h1>
            )}

            <div className={style.post__imgContainer}>
              <img
                src={"../icon/asd.jpg"}
                alt="photo"
                className={style.post__img}
              />
            </div>

            {change ? (
              <input
                className={`${style.post__input}`}
                type="text"
                placeholder="Теги к посту"
                value={post.tags}
                onChange={(e) => update(e.target.value, "tags")}
              />
            ) : (
              <div className={style.post__tags}>Tеги: {post.tags}</div>
            )}

            <div className={style.post__decorLine}></div>

            {change ? (
              <div className={`${style.post__editor}`}>
                <CKEditor
                  editor={ClassicEditor}
                  data={post.text}
                  className={style.editor}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    update(data, "text");
                  }}
                />
              </div>
            ) : (
              <div
                className={style.post__text}
                dangerouslySetInnerHTML={{ __html: post.text }}
              ></div>
            )}

            <div className={style.post__decorLine}></div>

            {role !== "admin" && post.author !== _id ? (
              <div className={style.post__containerButton}>
                <button
                  className={style.post__button}
                  onClick={() => subscribe()}
                >
                  подписаться
                </button>
              </div>
            ) : (
              <>
                {change ? (
                  <div className={style.post__containerButton}>
                    <button
                      className={style.post__button}
                      onClick={() => saveChange()}
                    >
                      сохранить
                    </button>
                    <button
                      className={style.post__button}
                      onClick={() => setChange(false)}
                    >
                      отмена
                    </button>
                  </div>
                ) : (
                  <div className={style.post__containerButton}>
                    {role === "admin" || post.author === _id ? (
                      <button
                        className={style.post__button}
                        onClick={() => setChange(true)}
                      >
                        изменить
                      </button>
                    ) : (
                      <></>
                    )}

                    {change ? (
                      <></>
                    ) : (
                      <>
                        {role === "admin" || post.author === _id ? (
                          <button
                            className={style.post__button}
                            onClick={() => deletePost()}
                          >
                            удалить
                          </button>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>

      <Modal active={modalActiveConfirm} setActive={setModalActiveConfirm}>
        <Confirm onDialog={areUSure} />
      </Modal>

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
    </div>
  );
};
