//#region PACKAGE IMPORTS
import React from 'react';
//#endregion

//#region MODULE IMPORTS
import Input from '../index';
//#endregion

//#region STYLESHEET IMPORTS
import './SearchInput.style.scss';
//#endregion

const SearchInput = ({ className, onChange, value, placeholder, disabled }) => {
  const classes = !className ? 'searchInput' : `searchInput ${className}`;
  return (
    <Input
      className={classes}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default SearchInput;
