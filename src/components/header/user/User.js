import React, { useContext } from 'react';
import './user.css';

import userPhoto from '../../../assets/user.png';
import { AppContext } from '../../../context/AppContext';

export const User = () => {

  const { user } = useContext(AppContext);


  return (
    <div className="header__user">
      {
      user ? (
      user.img ? (
        <img className="header__user__pic" src={user.img} alt='' />
      ):(
        <img className="header__user__pic" src={userPhoto} alt='' />
      )
      ):(
        <img className="header__user__pic" src={userPhoto} alt='' />
      )
      }
      <p className="header__user__name">
        {user ? (`${user.firstName + ' ' + user.lastName}`):('John Doe')}
      </p>
    </div>
  )
}
