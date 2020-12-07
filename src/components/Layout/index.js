//#region PACKAGE IMPORTS
import React from 'react';
//#endregion

//#region STYLESHEET IMPORTS
import './Layout.style.scss';
//#endregion

const Layout = ({ children, headerComponent }) => {
  return (
    <div className="layoutContainer">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
