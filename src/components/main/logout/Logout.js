import React, { useContext } from 'react'

import './logout.css';

import logoutIcon from '../../../assets/logout.svg';
import { Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { AppContext } from '../../../context/AppContext';

import './logout.css'

export const Logout = () => {
  
  const { logOut, messages, setLogOut, setUser, setUserList, setToken, setRedirect, setChats,setMessages, setLoading, setUnReadNum} = useContext(AppContext);


  const handleLogOut = ()=>{
    let socket = (chatRoomId)=>{
        return io.disconnect(`ws://novateva-codetest.herokuapp.com/?roomId=${chatRoomId}`)
    }
    setLogOut(true)
    setUser({})
    setUserList({})
    setToken({})
    setRedirect(false)
    setChats([])
    setMessages([])
    setLoading(false)
    setUnReadNum([])
    socket(messages.chatId);
    sessionStorage.setItem('user', ``);
    sessionStorage.setItem('token', ``);
    sessionStorage.setItem('email', ``);
    setTimeout(() => {
        setLogOut(false)
    }, 1000);
}



  return (
    <div className="main__sidebar__logout" onClick={handleLogOut}>
      <div className="main__sidebar__logout__container">
        <img className="main__sidebar__icon__logout" src={ logoutIcon } alt="logout icon" />
        <p className="main__sidebar__logout__paragraph">Logout</p>
      </div>
      {logOut ? (<Navigate to='/' replace={true} />):('')}

    </div>
  )
}