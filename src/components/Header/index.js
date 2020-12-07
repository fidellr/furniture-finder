//#region PACKAGE IMPORTS
import React from 'react';
//#endregion

//#region STYLESHEET IMPORTS
import './Header.style.scss';
//#endregion

const Header = ({ children }) => {
  return <div className="headerContainer">{children}</div>;
};

export default Header;
