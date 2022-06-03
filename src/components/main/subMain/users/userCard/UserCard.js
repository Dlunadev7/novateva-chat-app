import React, { useContext } from 'react';
import { AppContext } from '../../../../../context/AppContext.js';
import axios from 'axios';
import io from 'socket.io-client';
import userPhoto from '../../../../../assets/defaultUserPicture.svg'
import './userCard.css';

export const UserCard = ( {id, img, chatId, photo}) => {

    const {user, token, setMessages,chats, setChats, userList, newChat, setNewChat, unReadNum} = useContext(AppContext);
    
    const dateFrom =(date)=>new Date(date).getTime()

    const userMessages = chats.find((chat)=> chat._id === chatId);
    

    const background = 'linear-gradient(178.18deg, #FD749B -13.56%, #281AC8 158.3%)';
    const name =()=>{
        if(userList.length > 0){
            const regEx1 = id.replace('{', '')
            const regEx2 = regEx1.replace('}', '')
            const nam = userList?.find((u)=> u._id === regEx2);
            return `${nam?.firstName + ' ' + nam?.lastName}`;
        }
    } 

    const handleMessages = async ()=>{
        if(newChat){
            setNewChat(false)
            await axios.post('https://novateva-codetest.herokuapp.com/room/initiate',{
                    "userIds": [`{${user._id}}`,`${id}`],
                    "type": "consumer-to-consumer"
                },{
                    headers:{
                        'Authorization' : `Bearer ${token.auth}`
                    }
                })
                .catch(error=> console.error(error))

            await axios.get('https://novateva-codetest.herokuapp.com/room', {headers:{'Authorization' : `Bearer ${token.auth}`}})
            .then(response => setChats(response.data.conversation))
        }else{
            if(id !== user._id){
                let socket = (chatRoomId)=>{
                    return io(`ws://novateva-codetest.herokuapp.com/?roomId=${chatRoomId}`)
                }
                await userMessages.messages.sort((a, b)=>{return dateFrom(a.createdAt) < dateFrom(b.createdAt) })
                
                setMessages({
                    chatId: chatId, 
                    userMessages: userMessages.messages
                })
                await axios.put(`https://novateva-codetest.herokuapp.com/room/${chatId}/mark-read`,{},{
                    headers:{
                        'Authorization' : `Bearer ${token.auth}`
                    }
                })
                .catch(error=> console.error(error))
                socket(chatId).emit('new message', 'new message')
                
            }
        }
        
        
    }
    const UnRead = ()=>{
        if(id !== user._id){
            if(unReadNum.length > 0){
                const unread = unReadNum.find((chat)=> chat.chatId === chatId );
                if(unread){
                    if(unread.unRead > 0){
                        return <p style={{background:`${unread.unRead > 0?(background):('white')}`}} >{ unread.unRead}</p>
                    }
                }
                
                
            }
        }
    }
    

    return(
        <div className='userCard' onClick={handleMessages}>
            <div className='userCard__container'>
                <div className='userCard__picture__container' >
                    {
                        photo ? (
                            <img src={photo} className='userCard__picture' alt='' />
                        ):(
                            <img src={userPhoto} className='userCard__picture' alt='' />
                        )
                    }
                    
                </div>
                <div className='userCard__name'>
                    {userList ? (userList.length > 0 ? (name()):('Loading...')):('Loading...')}
                    
                </div>
            </div>
           
            <div className='msj-number'  >
                <UnRead />
            </div>
            
            
        </div>
    )
}