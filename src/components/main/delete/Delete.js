import React, { useContext, useState} from 'react';
import { AppContext } from '../../../context/AppContext.js';
import userPhoto from '../../../assets/user.png';
import '../subMain/submain/submain.css'
import './delete.css';
import axios from 'axios';

export const Delete = () => {
  const {user, token, chats, setChats, userList, setMessages} = useContext(AppContext);
  const [deleteChat, setDelete] = useState('')

  const findUserName = (userIds) => {

    if(userIds.length > 0 && userList.length > 0){

      const UId = userIds.find((id)=>{
          const regEx1 = id.replace('{', '')
          const regEx2 = regEx1.replace('}', '')
          return regEx2 !== user._id
      })
      
      const nam = userList.find((u)=> {
          const regEx1 = UId.replace('{', '')
          const regEx2 = regEx1.replace('}', '')
      return u._id === regEx2});

      return `${nam.firstName + ' ' + nam.lastName}`;
    }
  }

  const handleDelete = ()=>{
    if(deleteChat.length > 0 && token.auth){  
      axios.delete(`https://novateva-codetest.herokuapp.com/delete/room/${deleteChat}`,{
          headers:{'Authorization' : `Bearer ${token.auth}`}
      })
      .catch(error => console.error(error))

      setChats(chats.filter((chat)=> chat._id !== deleteChat))
      setMessages({})
      setDelete('')
    }

  }

  

  return(
    <div className='sub-main'>
      <div className='sub-main-container' style={{flexDirection: 'column'}} >
        <div className='delete__container'>
        <div className='delete__title'>
          <h1>Delete chat</h1>
        </div>
        <p>Wich chat would you like to delete:</p>
        <div className='delete__chats'>
          {chats.length > 0 ? (
            chats.map((chat)=>{
              return(
                <div className='chat__card' key={chat._id} onClick={()=>setDelete(chat._id)} style={deleteChat ? (deleteChat === chat._id ? ({filter:'brightness(80%)'}):({filter:'brightness(100%)'})):({})}>
                  <img  className="chat__card__image" src={userPhoto} alt='' />
                  <h3 className="chat__card__name">{findUserName(chat.userIds)}</h3>
                </div>
              )
                  
              })):(<h3>You don't have any chats yet</h3>
            )
          }
          </div>
          <div className="delete__buttons">
            {
              deleteChat ? (
                  <button 
                    onClick={()=> setDelete(false)}
                    className="buttonClasic"
                    style={{width: '250px', color: '#fff', border: 'unset'}}
                    >Cancel delete</button>
                ):('')
              }
              {
                deleteChat ? (
                  <button 
                    onClick={handleDelete}
                    className="buttonClasic"
                    style={{width: '250px', color: '#fff', border: 'unset'}}
                    >Delete</button>
                ):('')
              }
          </div>
        </div>    
      </div>      
    </div>
  )
}