//#region PACKAGE IMPORTS
import React, { useCallback, useEffect, useRef } from 'react';
//#endregion

//#region MODULE IMPORTS
import Input from '../Input';
//#endregion

//#region STYLESHEET IMPORTS
import './Dropdown.style.scss';
//#endregion

const Dropdown = ({
  data,
  chosenData,
  onChoose,
  isOpen,
  onClickOpen,
}) => {
  //#region REF
  const dropdownRef = useRef();
  //#endregion

  //#region HANDLER
  const toggleDropdown = useCallback(
    (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        if (isOpen) {
          onClickOpen(false);
        }
      }
    },
    [isOpen, onClickOpen]
  );
  //#endregion

  //#region LIFECYCLE
  useEffect(() => {
    document.addEventListener('click', (e) => toggleDropdown(e));
    document.addEventListener('touchend', (e) => toggleDropdown(e));

    return () => {
      document.removeEventListener('click', (e) => toggleDropdown(e));
      document.removeEventListener('touchend', (e) => toggleDropdown(e));
    };
  }, [toggleDropdown]);
  //#endregion

  return (
    <div ref={dropdownRef} className="dropdown">
      {data &&
        data.map((item) => (
          <div
            key={item}
            onClick={() => onChoose(item)}
            className="dropdownItem"
          >
            <label className="dropdownLabel">
              {item}
            </label>
            <Input
              value={item}
              id={item}
              isChecked={
                chosenData && chosenData.indexOf(item) !== -1 ? true : false
              }
              type="checkbox"
              onChange={() => onChoose(item)}
            />
          </div>
        ))}
    </div>
  );
};

export default Dropdown;
