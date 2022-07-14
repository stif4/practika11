import style from "./App.module.scss";
import { Header } from "./components/Header/header";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/home";
import { Registration } from "./pages/Registration/registration";
import { User } from "./pages/User/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthCheck } from "./store/slices/authSlice";
import { PrivateRoute } from "./components/privateRoute";
import ClipLoader from "react-spinners/ClipLoader";
import { NewPost } from "./pages/NewPost/newPost";
import { UserPost } from "./pages/userPost/userPost";

const App = () => {
  const dispathc = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  
  useEffect(() => {
    dispathc(fetchAuthCheck());
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.page}>
        <Header />
        <main className={style.main}>
          {isLoading ? (
            <ClipLoader size={50} />
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/user" element={<PrivateRoute component={User} />} />
              <Route path="/newPost" element={<PrivateRoute component={NewPost} />} />
              {/* <Route path="/newPost" element={<NewPost/>}/> */}
              <Route path="/userPost/:id" element={<PrivateRoute component={UserPost} />}/>
            </Routes>
          )}
        </main>
        <footer className={style.footer}>footer</footer>
      </div>
    </div>
  );
};

export default App;
