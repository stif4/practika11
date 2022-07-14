import React, { useState } from "react";
import style from "./newPost2.module.scss";
import { useForm } from "react-hook-form";
import parse from "html-react-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import $api from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NewPost = () => {
  const imageUrl = "";
  const [isLoading, setLoading] = useState("false");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTegs] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [image, setImage] = useState();
  const fileReader = new FileReader();

  const inputFileRef = React.useRef("null");

  fileReader.onloadend = () => {
    setImgUrl(fileReader.result);
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      setImage(file);
      fileReader.readAsDataURL(file);

      // try {
      //   const formData = new FormData();
      //   const file = event.target.files[0];
      //   formData.append("img", file);
      //   const { data } = await axios.post("/upload", formData);
      //   setImgUrl(data.url);
      // } catch (err) {
      //   console.warn(err);
      //   alert("Ошибка при загрузке файла!");
      // }

    }
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length) {
      setImage(event.dataTransfer.files[0]);
      fileReader.readAsDataURL(event.dataTransfer.files[0]);
    }
  };

  const handleDragEmpty = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // const handleChangeFile = async (event) => {
  //   try {
  //     const formData = new FormData();
  //     const file = event.target.files[0];
  //     formData.append("img", file);
  //     const { data } = await axios.post("/upload", formData);
  //     setImgUrl(data.url);
  //   } catch (err) {
  //     console.warn(err);
  //     alert("Ошибка при загрузке файла!");
  //   }
  // };

  const onClickRemoveImage = () => {
    setImgUrl();
    setImage();
  };

  const onSubmit = async (values) => {
    console.log("tap");
    try {
      setLoading(true);

      if (title === "" || tags === "" || text === "") {
        return toast("Заполни все поял формы!");
      }

      const fields = {
        title,
        //imgUrl,
        tags,
        text,
      };

      const { data } = await $api.post("/product/create", fields);

      if (data) {
        setText("");
        setTitle("");
        setTegs("");
        setImgUrl("");
        return toast("Пост добавлен!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.post}>
      <div className={style.post__container}>
        <input
          className={style.post__inputTitle}
          type="text"
          placeholder="Тема поста"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {imgUrl && (
          <div className={style.post__imgContainer}>
            <img
              src={imgUrl ? imgUrl : "no_photo.jpg"}
              className={style.post__img}
              alt="preview"
              onDrop={handleDrop}
              onDragEnter={handleDragEmpty}
              onDragOver={handleDragEmpty}
            />
          </div>
        )}

        {!imgUrl && (
          <button
            className={`${style.post__button} ${style.button}`}
            onClick={() => inputFileRef.current.click()}
          >
            Загрузить фото
          </button>
        )}
        {imgUrl && (
          <button
            className={`${style.post__button} ${style.button}`}
            onClick={onClickRemoveImage}
          >
            Удалить
          </button>
        )}

        <input
          ref={inputFileRef}
          className={style.post__input}
          type="file"
          onChange={handleOnChange}
          //onChange={handleChangeFile}
          hidden
        />
        {/* 
        {imgUrl && (
          <img
            className={style.post__img}
            src={`http://localhost:3001${imgUrl}`}
            alt="Uploaded"
          />
        )} */}

        <input
          className={style.post__input}
          type="text"
          placeholder="Теги к посту"
          value={tags}
          onChange={(e) => setTegs(e.target.value)}
        />

        <div className={style.post__editor}>
          <CKEditor
            editor={ClassicEditor}
            data={text}
            config={{}}
            className={style.editor}
            onChange={(event, editor) => {
              const data = editor.getData();
              setText(data);
            }}
          />
        </div>

        <div className={style.post__buttonContainer}>
          <button
            onClick={onSubmit}
            className={`${style.post__button} ${style.button}`}
          >
            Опубликовать
          </button>
          <a href="/">
            <button className={`${style.post__button} ${style.button}`}>
              Отмена
            </button>
          </a>
        </div>
        <div className={style.post__decorLine}></div>
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
    </div>
  );

  // const [image, setImage] = useState();
  // const [imageURL, setImageURL] = useState();
  // const fileReader = new FileReader();

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors, isValid },
  // } = useForm({
  //   mode: "onBlur",
  // });

  // fileReader.onloadend = () => {
  //   setImageURL(fileReader.result);
  // };

  // const handleOnChange = (event) => {
  //   event.preventDefault();
  //   if (event.target.files && event.target.files.length){
  //     const file = event.target.files[0];
  //     setImage(file);
  //     fileReader.readAsDataURL(file);
  //   }
  //   event.target.value = ''
  // };

  // const handleDrop = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   if (event.dataTransfer.files && event.dataTransfer.files.length) {
  //     setImage(event.dataTransfer.files[0]);
  //     fileReader.readAsDataURL(event.dataTransfer.files[0]);
  //   }
  // };

  // const handleDragEmpty = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  // };

  // const onSubmit = async (values) => {
  //   console.log("tap");
  // };

  // const deleteFile = ()=>{
  //   setImage();
  //   setImageURL();
  // }

  // return (
  //   <form className={style.fileUploader} onSubmit={handleSubmit(onSubmit)}>
  //     <label
  //       htmlFor="file-loader-button"
  //       className={style.fileUploader__customButton}
  //     >
  //       Загрузить файл
  //     </label>

  //     <input
  //       id="file-loader-button"
  //       type="file"
  //       accept="image/png"
  //       className={style.fileUploader__uploadButton}
  //       onChange={handleOnChange}
  //     />

  //     <img
  //       src={imageURL ? imageURL : "no_photo.jpg"}
  //       className={style.fileUploader__preview}
  //       alt="preview"
  //       onDrop={handleDrop}
  //       onDragEnter={handleDragEmpty}
  //       onDragOver={handleDragEmpty}
  //     />
  //     <div className="">{image ? image.name : ""}</div>
  //     <button onClick={deleteFile}>delete</button>
  //   </form>
  // );
};
