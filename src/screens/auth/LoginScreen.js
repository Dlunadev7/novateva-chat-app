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
    <div className="Login">
      <div className='subLogin'>
        <div className='title'>
            <h1>Welcome to </h1>
            <h1>Novateva chat</h1>
        </div>
        <div className='logOptions'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}