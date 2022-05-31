import React, { useContext } from 'react'
import { Button } from '../../button/Button'
import { Logout } from '../logout/Logout'

import './panel.css'

import chats from '../../../assets/chat-bubble.svg'
import trashCanWhite from '../../../assets/trash-can-white.svg'
import { Link } from 'react-router-dom'
import { AppContext } from '../../../context/AppContext'

export const Panel = () => {

  const { isOpen ,setIsOpen } = useContext(AppContext)

  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__buttons">
          <Link to="/chatapp" className="button__container">
            <Button title="Chat" count={ true } image={chats}/>
          </Link>
          <Link to="/chatapp/complaints" className="button__container" onClick={handleIsOpen}>
            <Button title="Complaints" image={chats} />
          </Link>
          <Link to="/chatapp/delete" className="button__container">
            <Button title="Delete" image={trashCanWhite} />
          </Link>
        </div>
        <Logout />
      </div>
    </div>
  )
}
