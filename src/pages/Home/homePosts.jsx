import React from "react";
import { Link } from "react-router-dom";
import style from "./home.module.scss";

export const Posts = ({ posts }) => {
  return (
    <>
      {posts ? (
        posts.map((e) => {
          return (
            <div className={style.post}>
              <Link to={`/userPost/${e._id}`} className={style.post__container}>
                <img
                  src={`./icon/asd.jpg`}
                  alt="photo"
                  className={style.post__img}
                />
                <h3 className={style.post__title}> {e.title} </h3>
              </Link>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
