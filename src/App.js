
import style from'./App.module.scss';
import { Header } from './components/Header/header';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/home';
import { Registration } from './pages/Registration/registration';
import { User } from './pages/User/user';

const App = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.page}>
        <Header />
        <main className={style.main}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/user' element={<User/>} />
          </Routes>
        </main>
        <footer className={style.footer}>footer</footer>
      </div>
    </div >
  );
}
export default App;
