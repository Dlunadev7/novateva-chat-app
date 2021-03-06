import React, {useContext, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../../../context/AppContext';
import { Read } from './read/Read';
import { UnRead } from './read/UnRead';
import html2canvas from "html2canvas";
import './readChat.css';
import axios from 'axios';

export const ReadChat = () => {
    const {token, messages,  setMessages, setUrl} = useContext(AppContext);
    const [sendMsj, setSendMsj] = useState('')
    const [loadingComplaint, setLoadingCompl] = useState(false)
    const [redirectComplaint, setRedirectCompl] = useState(false)
    
    

    const dateFrom =(date)=> new Date(date).getTime();
    

      
    


    const handleSend = async ()=> {
        let temMessage =  messages.userMessages;
        
        if(messages.chatId){
            
            await axios.post(`https://novateva-codetest.herokuapp.com/room/${messages.chatId}/message`,{
                "messageText": `${sendMsj}`
            },{
                headers:{
                    'Authorization' : `Bearer ${token.auth}`
                }
            })
            .then(response =>temMessage.push(response.data.post))
            .catch(error => console.log('error:', error))

            
            await temMessage.sort((a, b)=>{return dateFrom(a.createdAt) < dateFrom(b.createdAt) })
            
            setMessages({
                ...messages, 
                userMessages: temMessage
            })
            
        }
        setSendMsj('')
    }

    const handleComplaints = async ()=>{
        setLoadingCompl(true)
        
        const element = document.getElementById('conversationContainer')
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL("image/png", 1.0);
        setUrl(image)
        if(image){
            setRedirectCompl(true)
            setTimeout(() => {
                setLoadingCompl(false)
                setRedirectCompl(false)
            }, 500);
        }
    }



    
    
    return(
        <div className='chat' >
            {messages.chatId ? (
                <div className='chat__container'>
                        <div className='conversationContainer' id='conversationContainer'>
                            <UnRead />
                            <Read />
                        </div>
                    <div className='chat__input__message'>
                        <button 
                            onClick={handleComplaints}
                            className="button__fab">{loadingComplaint ? ('Loading...'):('Report chat')}</button>


                        <div className="chat__input__typer">
                            <textarea  
                            value={sendMsj}
                            onChange={(e)=>setSendMsj(e.target.value)}
                            maxLength="200"
                            className="chat__input__search"
                            placeholder='Start typing here'/>
                            <button 
                                onClick={handleSend}
                                className="button" 
                                style={{margin: '0px', borderRadius: '50px', border: 'unset', width: '84px', color: '#fff', padding: '0px', display: 'flex', justifyContent: 'center'}} 
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            ):(<h1 className='no-chat'>Start typing something :)</h1>)}
            {redirectComplaint ? (<Navigate to='/chatapp/complaints' replace={true} />):('')}
        </div>
            
            
        
    )
}