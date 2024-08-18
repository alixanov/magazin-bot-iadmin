import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css";

const Login = () => {
     const [login, setLogin] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();



     const handleLogin = () => {
          if (login === "login" && password === "parol") {
               navigate('/card');
          } else {
               alert('Неправильный логин или пароль');
          }
     };

     return (
          <div className='login'>
               <form className='form' onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <label>Логин</label>
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                    <label>Пароль</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Войти</button>
               </form>
          </div>
     );
};

export default Login;

//login