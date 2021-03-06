import React, { useState} from 'react';
import { Link, Navigate} from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './form.css'


export const SignUp = () => {
  
  const [redirectLogIn, setRedirectLogIn] = useState(false);
  const [form, setForm] = useState({
    name:'',
    lastName:'',
    email:'',
    password: ''
  })

  const { name, lastName, email, password } = form;

  const handleSignIn = async(e) => {

    e.preventDefault();

    if(name.length <= 0 && lastName.length <= 0 && email.length <= 0 && password.length <= 0) {
      toast.error('Todos los campos son obligatorios!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else if(name.length < 1) {
      toast.warn('El nombre es obligatorio!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else if(lastName.length < 1) {
      toast.warn('El Apellido es obligatorio!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else if(email.length < 1) {
      toast.warn('El Email es obligatorio!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else if(password.length < 1) {
      toast.warn('La password es obligatorio!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } 
    else {
      toast.success('??Registracion de usuario con exito!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }


    await axios.post('https://novateva-codetest.herokuapp.com/users', {
      'email' : `${form.email}`,
      'password' : `${form.password}`,
      "firstName": `${form.name}`,
      "lastName": `${form.lastName}`,
      "type": "consumer" ,
    })
    .then(response => response.status === 200 ? 
        (setRedirectLogIn(true))
        :
        (''))
    .catch(error=> console.error(error))

    setTimeout(() => {
      setRedirectLogIn(false)
    });


  }

  return (
    <div className="home__login">
      <div className="home__login__container">
        <div className="home__login__forms">
        <article className="form">
          {/* <h2 className="form__title">Logout</h2> */}
          <form className="form__dates" onSubmit={handleSignIn}>
          <label className="form__place">
            First Name
            <span className="form__place__container">
              <input 
                name="firstName"
                className="form__place__input"
                type="text"
                placeholder="John"
                value={form.name} 
                onChange={(e)=>setForm({...form, name:`${e.target.value}`})}
              />
            </span>
          </label>
          <label className="form__place">
            Last Name
            <span className="form__place__container">
              <input 
                name="lastName"
                className="form__place__input"
                type="text"
                placeholder="Doe"
                value={form.lastName} 
                onChange={(e)=> setForm({...form, lastName:`${e.target.value}`})}
              />
            </span>
          </label>
          <label className="form__place">
            Email
            <span className="form__place__container">
              <input 
                name="email"
                className="form__place__input"
                type="email"
                placeholder="johndoe@gmail.com"
                value={form.email}
                onChange={(e)=>setForm({...form, email:`${e.target.value}`})}
              />
            </span>
          </label>
          <label className="form__place">
            Password
            <span className="form__place__container">
              <input 
              className="form__place__input"
                name="password"
                type="password"
                min={8}
                placeholder="********"
                value={form.password}
                onChange={(e)=>setForm({...form, password:`${e.target.value}`})}
              />
            </span>
          </label>
          <span>
          ??Have Account? <Link to={"/signIn"}>Sign In</Link>
          </span>
          <button className="form__submit" onClick={handleSignIn}>
            Sign Up
          </button>
          </form>
        </article>
        </div>
      </div>
      {redirectLogIn ? (<Navigate to='/signin' replace={true} />):('')}
    </div>
  );
}