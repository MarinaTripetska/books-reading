import React, { useState } from 'react';
import svgEmptyCheckbox from '../../../assets/img/checkbox-empty.svg';
import svgCheckedCheckbox from '../../../assets/img/checkbox-checked.svg';
import BookStatusI, { statusBook } from '../../../utils/bookStatus';

interface CheckboxProps {
  status: BookStatusI;
  clb: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ status, clb }) => {
  const [isChecked, setIsChecked] = useState(status === statusBook.DONE);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    clb();
  };

  return (
    <div onClick={toggleCheckbox}>
      {isChecked ? (
        <img src={svgCheckedCheckbox} alt="Checked" />
      ) : (
        <img src={svgEmptyCheckbox} alt="Unchecked" />
      )}
    </div>
  );
};

export default Checkbox;
