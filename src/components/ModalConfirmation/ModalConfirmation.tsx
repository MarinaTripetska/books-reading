import React from 'react';
import styles from './ModalConfirmation.module.scss';

interface Props {
  iconPath?: string;
  questionTxt: string;
  confirmBtnTxt: string;
  onConfirmClick: () => void;
}

const ModalConfirmation: React.FC<Props> = ({
  iconPath,
  questionTxt,
  confirmBtnTxt,
  onConfirmClick,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {iconPath && <img src={iconPath} alt="" />}
        <p className={styles.text}>{questionTxt}</p>
        <button
          className={styles.confirmBtn}
          type="button"
          onClick={onConfirmClick}
        >
          {confirmBtnTxt}
        </button>
      </div>
    </div>
  );
};

export default ModalConfirmation;
