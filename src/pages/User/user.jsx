import React, { useEffect, useState } from "react";
import style from "./user.module.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  allUserPosts,
  getUserSubscribers,
  updateOnChange,
} from "../../store/slices/postSlice";
import { Posts } from "../Home/homePosts";
import { Pagination } from "../Home/homePagination";
import { Link, Navigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";

export const User = () => {

  const userPosts = useSelector((state) => state.post.userPosts);
  const userSubscribes = useSelector((state) => state.post.userSubscribes);
  const { _id } = useSelector((state) => state.auth.data.data._doc);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUserPosts());
    dispatch(getUserSubscribers(_id));
  }, []);

  console.log(userSubscribes);

  const [postsPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * postsPage;
  const firstIndex = lastIndex - postsPage;

  let postSlice1 = 0;
  let postSlice = 0;

  if (userSubscribes) {
    const newArray = userSubscribes.flat();
    postSlice1 = newArray.slice(firstIndex, lastIndex);
  }

  if (userPosts) {
    postSlice = userPosts.slice(firstIndex, lastIndex);
  }

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  ////

  const [imgUrl, setImgUrl] = useState("");
  const fileReader = new FileReader();
  const inputFileRef = React.useRef("null");
  const inputFileRef2 = React.useRef("null");

  fileReader.onloadend = () => {
    setImgUrl(fileReader.result);
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      //setImage(file);
      fileReader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const onClickRemoveImage = () => {
    setImgUrl();
    //setImage();
  };

  const changeValeu = useSelector((state) => state.post.onCahnge);
  console.log(changeValeu);
  const change = (value) => {
    console.log(value);
    if (value === 2) {
      dispatch(updateOnChange(true));
    }
    if (value === 1) {
      dispatch(updateOnChange(false));
    }
    //console.log(inputFileRef2.current.value())
  };

  return (
    <div className={`${style.user__container} ${style.user}`}>
    <div className={style.user__top}>
      <form action="" className={`${style.user__info} ${style.info}`}>
        <div className={`${style.user__imgForm} ${style.img}`}>
          <div className={style.user__imgContainer}>
            <img
              src={imgUrl ? imgUrl : "./icon/user__icon.png"}
              className={style.post__img}
              alt="preview"
            />
          </div>

          {!imgUrl && (
            <button
              className={`${style.user__button} ${style.button}`}
              onClick={(event) => {
                event.preventDefault();
                inputFileRef.current.click();
              }}
            >
              Загрузить фото
            </button>
          )}
          {imgUrl && (
            <button
              className={`${style.user__button} ${style.button}`}
              onClick={onClickRemoveImage}
            >
              Удалить
            </button>
          )}

          <input
            ref={inputFileRef}
            className={style.user__input}
            type="file"
            onChange={handleOnChange}
            //onChange={handleChangeFile}
            hidden
          />
        </div>

        <input
          type="text"
          className={style.info__input}
          placeholder="ваше имя"
        />

        <input
          type="text"
          className={style.info__input}
          placeholder="ваша фамилия"
        />

        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className={style.info__aboutMe}
          placeholder="Трактрист Олег из Москвы, трое детей!"
        ></textarea>

        <input
          type="submit"
          name=""
          id=""
          className={`${style.user__button} ${style.user__button_pading}`}
        />
      </form>
    </div>

    <div className={style.link__container}>
      <Link to={"/newPost"} className={style.link__post}>
        Создать пост
      </Link>
      <BsPlusCircle size={30} />
    </div>

    <div className={style.user__bottom}>

      <div className={style.user__buttonContainer}>
        <button className={style.user__button} onClick={() => change(2)}>мои посты</button>
        <button className={style.user__button} onClick={() => change(1)}>учавствую</button>
      </div>

      {/* <h2 className={style.user__h2}>Мои посты</h2> */}
      <div className={style.user__posts}>
        {changeValeu ? (
          <>{userPosts ? <Posts posts={postSlice} /> : <></>}</>
        ) : (
          <>{userSubscribes ? <Posts posts={postSlice1} /> : <></>}</>
        )}
      </div>
      
      <div>
        {changeValeu ? (
          <>
            {userPosts ? (
              <Pagination
                postsPage={postsPage}
                totalPosts={userPosts.length}
                pagination={pagination}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            {userSubscribes ? (
              <Pagination
                postsPage={postsPage}
                totalPosts={userSubscribes.length}
                pagination={pagination}
              />
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  </div>
  );
};
