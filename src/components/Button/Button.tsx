import React, { FC } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  handleClick: () => void;
  btnClass: string;
  title: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
};

const Button: FC<ButtonProps> = ({
  handleClick,
  btnClass,
  title,
  type = 'submit',
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${styles.btn} ${btnClass}`}
    >
      {title}
    </button>
  );
};

export default Button;
