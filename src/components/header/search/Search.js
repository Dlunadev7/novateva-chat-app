import React from 'react'

import './search.css';
import iconSearch from '../../assets/Search-Icon.svg';

export const Search = () => {
  return (
    <div className="header__search__wrapper">
      <div className="header__search">
        <img className="search__icon" src={ iconSearch } alt="Search Icon" />
        <input className="search__input" type="text" placeholder="User search" />
      </div>
    </div>
  )
}