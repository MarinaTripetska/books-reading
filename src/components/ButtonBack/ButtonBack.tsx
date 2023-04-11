import React from 'react';
import { ReactComponent as BackIcon } from './assets/back.svg';
import styles from './ButtonBack.module.scss';

interface ButtonBackProps {
  handleClick: () => void;
}

function ButtonBack({ handleClick }: ButtonBackProps) {
  const handleClickWrapper = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleClick();
  };
  return (
    <button
      className={styles.buttonBack}
      onClick={handleClickWrapper}
    >
      <BackIcon />
    </button>
  );
}

export default ButtonBack; 