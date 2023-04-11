import React from 'react';
import Select, { StylesConfig, MultiValue, ActionMeta } from 'react-select';
import { PropsDropdown, DropdownOption } from './Dropdown.interface';

const Dropdown: React.FC<PropsDropdown> = ({ placeHolder, options, noOptionsMessage, onChange }) => {

  const handleChange = (selectedOptions: MultiValue<unknown>,  actionMeta: ActionMeta<unknown>) => {
    if(!actionMeta) {
      //console.log('its only for type');
    }
    const valueArr = (selectedOptions as DropdownOption[]).map(option => option.value);
    onChange(valueArr);
  };

  const customStyles: StylesConfig = {
    menu: (styles) => ({
      ...styles,
      borderRadius: '0',
    }),
    option: (provided, { isFocused, isSelected }) => ({
      ...provided,
      backgroundColor: isSelected ? undefined : isFocused ? '#F5F7FA' : 'white',
      color: isSelected ? 'white' : 'black',
      padding: 13,
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      boxShadow: 'inset 0px 1px 2px rgba(29, 29, 27, 0.15)',
      borderRadius: 0,
      minHeight: '42px',
      fontSize: '14px',
    }),
  };
  return (
    <>
      <Select
        styles={customStyles}
        closeMenuOnSelect={false}
        placeholder={placeHolder}
        noOptionsMessage={() => noOptionsMessage}
        isMulti
        options={options}
        onChange={handleChange}
      />
    </>
  );
};

export default Dropdown;
