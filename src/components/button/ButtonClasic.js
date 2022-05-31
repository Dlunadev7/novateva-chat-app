import React from 'react'

import './buttonClasic.css'

export const Button = ({title}) => {
  return (
    <div className="buttonClasic">
      <img src={image} alt="chat icon" />
      <p className="buttonClasic__title">{title}</p>
    </div>
  )
}
 