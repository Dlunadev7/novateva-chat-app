import React, {useState, useEffect, useContext} from 'react';
import { Link, Navigate } from "react-router-dom";
import { AppContext } from '../../../context/AppContext.js';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './login.css';


export const Login = () => {

  const {token, setToken,redirect, setRedirect,  loading, setLoading,  setLogOut} = useContext(AppContext);
  

  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    email:'',
    password: ''
  })

  const { email, password } = form;

  useEffect(() => {
    setRedirect(false)
    setLogOut(false)
  }, [setRedirect, setLogOut]);


  const handleLogIn = async (e) => {

    if(email.length <= 1 && password <= 1) {
      toast.error('Todos los campos son obligatorios!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }  else if(error) {
      toast.warn('Contraseña o usuario incorrecto!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else if(!error){
      toast.success('Inicio de usuario con exito!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });  
    }
  
  

    e.preventDefault();
    
    setLoading(true);
    let tempToken = {};
    await axios.post('https://novateva-codetest.herokuapp.com/login', {
      'email' : `${form.email}`,
      'password' : `${form.password}`
    })
    .then(response => response.status === 200 ? (tempToken = {...token,email:form.email, auth:response.data.authorization}):(setError(true)))
    .catch(e => setError(true))
    
    if(tempToken.auth && tempToken.email){
      setToken(tempToken)
      sessionStorage.setItem('token', `${tempToken.auth}`);
      sessionStorage.setItem('email', `${tempToken.email}`);
    }
    if(token.auth){
      setRedirect(true)
    }


    
  }

  return (
    <div className="home__login">
      <div className="home__login__container">
        <div className="home__login__forms">
          <article className="form">
            <form className="form__dates" value={form}>
            <label className="form__place">
              Email
              <span className="form__place__container">
                <input 
                  className="form__place__input" 
                  type='email' 
                  name="email" 
                  placeholder="john_doe@gmail.com" 
                  value={form.email} 
                  onChange={(e)=>setForm({...form, email:`${e.target.value}`})}
                />
              </span>
            </label>
            <label className="form__place">
              Password
              <span className="form__place__container">
                <input className="form__place__input"
                  min={8}
                  placeholder="********"
                  type='password' 
                  name='password' 
                  value={form.password} 
                  onChange={(e)=>setForm({...form, password:`${e.target.value}`})}
                  />
              </span>
            </label>
            <span>
              ¿Need Account? <Link to={"/signUp"}>Sign Up</Link>
            </span>
            <button className="form__submit" onClick={handleLogIn}>
              {loading && !error ? ('Loading...'):('Log in')}
            </button>
            </form>
          </article>  
        </div>
      </div>
      {redirect ? (<Navigate to='/chatapp' replace={true} />):('')}
    </div>

  );
}
