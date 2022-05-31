import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';

import './button.css'

export const Button = ({title, count = false, image = ''}) => {

  const { unReadNum } = useContext(AppContext);
 

  const UnRead = ()=> {
    if(unReadNum.length > 0) {
        const unread = unReadNum.map((chat)=> chat.unRead );
        const reducer = unread.reduce((a, b)=> a + b)
        
      if(reducer > 0){
          return<span className="button__count">{ reducer }</span>
      }   
    }     
  } 

  return (
    <div className="button">
      <img src={image} alt="chat icon" />
      <p className="button__title">{title}</p>      
    {
      count ? 
        <UnRead />
            :
        ''
    }
    </div>
  )
}
 