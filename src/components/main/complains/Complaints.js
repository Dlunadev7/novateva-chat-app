import axios from 'axios';
import React, { useContext, useState} from 'react';
import { AppContext } from '../../../context/AppContext.js';
import { Button } from '../../button/Button.js';
import '../subMain/Submain/Submain.css'
import './complaints.css';

export const Complaints = () => {


  const { token,  url, setUrl } = useContext(AppContext);
  const [ complaint, setComplaint ] = useState('') 
  const [ complaintError, setComplaintError ] = useState(false)

  const handleComplaints = ()=> {
      
    if(token.auth && complaint.length > 0 && url){
        axios.post('https://novateva-codetest.herokuapp.com/complaints',{
        "description": `${complaint}`,
        "file_64": `${url}`
    },{
        headers:{'Authorization' : `Bearer ${token.auth}`}
    })
      .then(response=> response.status === 200 ? (setComplaint(''), setUrl('')):(setComplaintError(true)))
      .catch(() => setComplaintError(true))
    }
    
  }

  return (
    <div className='complaints'>
      <div className='sub-main-container' style={{flexDirection: 'column'}} >
        <div className='complaints__container'>
          <h2 className="complaints__title">Send Complaints</h2>
          <p className='complaints__sub__title'>Here's a screenshot of the chat you want to report</p>
          <div className='complaints__report'>
            {url ? (
                <img className="complaints__report__img" src={url} alt='' />
            ):(<h3 className="complaints__text__report" >No chat reported yet</h3>)}
          </div>
          
          <textarea
            className="complaints__textarea"
            value={complaint}
            onChange={(e)=> setComplaint(e.target.value)}
            maxLength="200"
            placeholder='Tell us about the problem' />
          {url ? (
            // <button onClick={()=>setUrl('')} className='complaints__cancel'>Cancel</button>
            <Button onClick={() => setUrl('')} />
          ):(<div className='complaints__button'></div>)}

          {complaintError ? (<p className='complaints__error'>Couldn't send report</p>):('')}

          {url && complaint.length > 0 ? (
              <button onClick={handleComplaints} className='complaints__send' >Send</button>
          ):(<div className='complaints__error'></div>)}
        
        </div>
      </div>
    </div>
  )
}