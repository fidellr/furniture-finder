//#region PACKAGE IMPORTS
import React, { useState } from 'react';
//#endregion

//#region MODULE IMPORTS
import Dropdown from '../../Dropdown';
//#endregion

//#region STYLESHEET IMPORTS
import './DropdownInput.style.scss';
//#endregion

const DropdownInput = ({
  className,
  placeholder,
  data,
  onChoose,
  chosenData,
  disabled,
}) => {
  //#region STATE
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //#endregion

  const toggleDropdown = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  const inputValue =
    !chosenData || !chosenData.length ? null : chosenData.join(', ');
  const classes = !className
    ? 'dropdownInputContainer'
    : `dropdownInputContainer ${className}`;

  return (
    <div className={classes}>
      <div
        onClick={() => toggleDropdown(!isDropdownOpen)}
        className="inputContainer"
      >
        <div
          className={
            `input ${!inputValue ? 'is-empty' : ''}` +
            `${disabled ? ' is-disabled' : ''}`
          }
        >
          {!inputValue ? placeholder : inputValue}
        </div>
        <div className="arrow" />
      </div>
      {isDropdownOpen && (
        <Dropdown
          isOpen={isDropdownOpen}
          data={data}
          chosenData={chosenData}
          onChoose={onChoose}
          onClickOpen={toggleDropdown}
        />
      )}
    </div>
  );
};

export default DropdownInput;
