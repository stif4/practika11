import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleRedirect } from "../../store/slices/authSlice";
import $api from "../../axios";
import { allPosts } from "../../store/slices/postSlice";
import style from "./home.module.scss";
import { useState } from "react";
import { Pagination } from "./homePagination";
import { Posts } from "./homePosts";
import {RiSearch2Line} from 'react-icons/ri'


export const Home = () => {
  const redirect = useSelector((state) => state.auth.isRedirect);
  // const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const wasAuthorised = useSelector((state) => state.auth.itWasAuthorised);

  setTimeout(() => {
    if (redirect && !wasAuthorised) {
      toast("ЧЕЛ ЗАЛОГИНСЯ ПЖ, ЧЕ КАК ЛОХ!");
      dispatch(toggleRedirect(false));
    }
  }, 0);

  const posts = useSelector((state) => state.post.data);
  const [postsPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(allPosts());
  }, []);

  const lastIndex = currentPage * postsPage;
  const firstIndex = lastIndex - postsPage;
  let postSlice = 0

  if(posts){
    postSlice = posts.slice(firstIndex,lastIndex)
  }

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <div className={`${style.home__container} ${style.home}`}>
        <div class={style.home__serach}>
          <input className={style.home__serachInput} placeholder="Поиск" />
          <button className={style.home__serachButton}><RiSearch2Line size={50} color={'#e6b6ff'}/></button>
        </div>

        <form action="" className={style.home__filter}>
          <div className={style.home__filterContainer}>
            <select name="list1">
              <option>Все мероприятия</option>
              <option>Природа</option>
              <option>Клубы</option>
              <option>Вписки</option>
            </select>
          </div>
        </form>

        <div className={style.home__posts}>
          {posts ? <Posts posts={postSlice}/> : <></>}
        </div>
        <div>
          {posts ? (
            <Pagination postsPage={postsPage} totalPosts={posts.length} pagination={pagination}/>
          ) : (
            <></>
          )}
        </div>
      </div>

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
