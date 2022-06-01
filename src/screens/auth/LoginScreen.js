import React, {useEffect, useContext} from 'react';
import { AppContext } from '../../context/AppContext.js';
import { Outlet  } from "react-router-dom";

import './loginScreen.css';


export const LoginScreen = () => {
  const { setRedirect, setLoading} = useContext(AppContext);

  useEffect(() => {
    setLoading(false)
    setRedirect(false);
    
  }, [setRedirect, setLoading]);

  

  return (
    <div className="loginScreen">
      <div className='loginScreen__container'>
        <div className='loginScreen__title__container'>
            <h1>Novateva chat</h1>
        </div>
        <div className='loginScreen__options'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}