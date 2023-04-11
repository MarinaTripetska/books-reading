import classNames from 'classnames';
import React from 'react';
import styles from './Button.module.scss';

interface ButtonProp {
  type: ButtonType;
  handleClick: () => void;
  title?: string | null;
}

export enum ButtonType {
  plus = 'plus',
  add = 'add',
  done = 'done'
}

function Button({ type, handleClick, title }: ButtonProp) {
  const handleClickWrapper = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleClick();
  };
  return (
    <button
      className={
        classNames(
          styles.btn,
          (type === ButtonType.plus) && styles.plus,
          (type === ButtonType.add) && styles.add,
          (type === ButtonType.done) && styles.done)}
      onClick={handleClickWrapper}
    >
      {title}
    </button>
  );
}

export default Button;