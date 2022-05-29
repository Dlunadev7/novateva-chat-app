import React, {useState, useEffect, useContext} from 'react';
import { Link, Navigate } from "react-router-dom";
import { AppContext } from '../../../context/AppContext.js';
import axios from "axios";

import './login.css';


export const Login = () => {

  const {token, setToken,redirect, setRedirect,  loading, setLoading,  setLogOut} = useContext(AppContext);
  

  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    email:'',
    password: ''
  })


  useEffect(() => {
    setRedirect(false)
    setLogOut(false)
  }, [setRedirect, setLogOut]);


  const handleLogIn = async ()=>{
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
          <form className="form__dates" onSubmit={handleLogIn} value={form}>
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
          {error ? (<p>Email or password incorrect</p>):('')}
          <span>
            ¿Need Account? <Link to={"/signUp"}>Sign Up</Link>
          </span>
          <button className="form__submit" onClick={handleLogIn}>
            {loading ? ('Loading...'):('Log in')}
          </button>
          </form>
        </article>  
      </div>
    </div>
    {redirect ? (<Navigate to='/chatapp' replace={true} />):('')}
  </div>

  );
}

/*

<div className="home__login">
    <div className="home__login__container">
      <div className="home__login__forms">
        <article className="form">
          <h2 className="form__title">Sign In</h2>
          <form className="form__dates" onSubmit={handleSubmit} value={form}>
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
          {error ? (<p>Email or password incorrect</p>):('')}
          <span>
            ¿Need Account? <Link to={"/signUp"}>Sign Up</Link>
          </span>
          <button className="form__submit" onClick={handleLogIn}>
            {loading ? ('Loading...'):('Log in')}
          </button>
          </form>
        </article>  
      </div>
    </div>
    {redirect ? (<Navigate to='/chatapp' replace={true} />):('')}
  </div>

*/