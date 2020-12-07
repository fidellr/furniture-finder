//#region PACKAGE IMPORTS
import React from 'react';
//#endregion

//#region STYLESHEET IMPORTS
import './Input.style.scss';
//#endregion

const Input = ({
  id,
  className,
  onChange,
  type = 'text',
  value,
  placeholder,
  disabled,
  isChecked,
}) => {
  const classes = !className ? 'inputContainer' : `inputContainer ${className}`;
  return (
    <input
      id={id}
      disabled={disabled}
      className={classes}
      type={type}
      value={value}
      checked={isChecked}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
