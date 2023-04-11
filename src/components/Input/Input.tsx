import React, { useState } from 'react';
import styles from './Input.module.scss';
import eye from '../../assets/img/eye.svg';
import crossedEye from '../../assets/img/eye-crossed.svg';

interface InputI {
  labelName: string;
  name: string;
  type: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  labelName,
  name,
  type,
  value,
  handleChange,
}: InputI) {
  const [cross, setCross] = useState(true);

  const handleClick = () => {
    setCross(!cross);
  };

  return (
    <label className={styles.labelAuth}>
      {' '}
      {labelName}
      <input
        className={styles.inputAuth}
        id={name}
        name={name}
        type={
          type === 'password' || type === 'confirmPassword'
            ? cross
              ? 'password'
              : 'text'
            : type
        }
        value={value}
        onChange={handleChange}
      />
      {name === 'password' || name === 'confirmPassword' ? (
        <button type="button" className={styles.btnEye} onClick={handleClick}>
          {cross ? (
            <img className={styles.img} src={crossedEye} alt="Eye" />
          ) : (
            <img className={styles.img} src={eye} alt="Eye" />
          )}
        </button>
      ) : null}
    </label>
  );
}
