import React from 'react';
import { AppContext } from '../../context/AppContext';
import bell from '../../assets/bell.svg';
import searchIcon from '../../assets/search-icon.svg';
import './header.css';
import { User } from './user/User';
import { Notification } from './notification/Notification';

export const Header = () => {
  return(
    <div className='top-bar'>
      <div className='user-search'>
        <div className='sub-user-search'>
          <img src={searchIcon} alt=''  />
          <input type='text' placeholder='User search' />
      </div>
      
      </div>
      <div className="header__user__section">
        <User />
        <Notification />
      </div>
    </div>
  )
}
