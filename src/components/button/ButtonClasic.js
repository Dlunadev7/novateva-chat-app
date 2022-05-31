import React from 'react'

import './buttonClasic.css'

export const ButtonClasic = ({title, handleClick}) => {


  return (
    <div className="buttonClasic" onClick={handleClick}>
      <p className="buttonClasic__title">{title}</p>
    </div >
  )
}
 