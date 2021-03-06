import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'

import { ChatScreen, Complaints, Delete, LoginScreen, Login, SignUp , SubMain } from '../components'
import { AppContext } from '../context/AppContext'

export const AppRouter = () => {

  const {user, chats, setUser, token, setToken, setUserList, setRedirect, setUnReadNum} = useContext(AppContext);
  
  //first set user from the page log in
  
    useEffect(() => {
  
       async function getUser(){
        try{
          const docRef = await axios.get(`https://novateva-codetest.herokuapp.com/users`)
          .then(response =>  response.data.users)
          .catch((e)=>console.error(e))
          if(docRef.length > 0){
            const U = docRef.filter((u)=> u.email === token.email)
            setUser(U[0]);
            sessionStorage.setItem('user', `${U[0]._id}`);
            setUserList(docRef);
            setRedirect(true);
          }
        }catch(e){
          console.error(`Error: ${e}`)
        }
      }
      if(token.auth){
        getUser();
      }
      
      
    }, [token, setUser, setUserList, setRedirect]);
  
    //On page re load set user
  
    useEffect(() => {
      const tempUsr = sessionStorage.getItem('user');
      async function onReload(){
        
        await axios.get(`https://novateva-codetest.herokuapp.com/users/${tempUsr}`)
          .then(response => setUser(response.data.user))
          .catch((e)=>console.error(e))
      }
      if(tempUsr && token.auth === undefined ){
        
        if(tempUsr.length > 0 ){
          onReload()
        }
      }
    }, [setUser, token]);
    
  
    //on reload set user token
  
    useEffect(() => {
      const tempToken = sessionStorage.getItem('token');
      const tempEmail = sessionStorage.getItem('email');
  
      if(tempToken && tempEmail){
        
        if(tempToken.length > 0 && tempEmail.length > 0){
          setToken({auth:tempToken, email:tempEmail})
        }
      }
      
    }, [setToken]);
  
  
  
    //All un read messages amount
  
    useEffect(() => {
  
      const unRead = chats.map((chat)=>{
        const unreadMsj = chat.messages.filter((msj)=>{
          if(msj.readByRecipients.length <= 1){
              if(msj.readByRecipients.some((u)=> u.readByUserId !== user._id)){
                  return true;
              }else{return false}
          }else{return false}
          }
        )
        return {chatId:chat._id, unRead: unreadMsj.length}
      })
    setUnReadNum(unRead)
  
    },[chats, user, setUnReadNum ]);
  
    
  

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="chatapp" element={<ChatScreen />} >
            <Route path="complaints" element={<Complaints />} />
            <Route path="delete" element={<Delete />} />
            <Route path="" element={<SubMain />} />
          </Route>
        </Route>
        <Route>
          <Route exact path="/" element={<LoginScreen />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<Login />} />
            <Route path="" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
