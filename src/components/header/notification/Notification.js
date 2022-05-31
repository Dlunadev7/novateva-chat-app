import React, { useContext } from 'react'

import './notification.css';

import bell from '../../../assets/bell.svg'
import { AppContext } from '../../../context/AppContext';

export const Notification = () => {

  const { unReadNum } = useContext(AppContext);
 

  const UnRead = ()=> {
    if(unReadNum.length > 0) {
        const unread = unReadNum.map((chat)=> chat.unRead );
        const reducer = unread.reduce((a, b)=> a + b)
        
      if(reducer > 0){
          return<span className="header__notification__count">{ reducer }</span>
      }   
    }     
  } 

  return (
    <div className="header__notification">
      <img className="header__notification__icon" src={bell} alt="Bell icon" />
      <UnRead />
    </div>
  )
}