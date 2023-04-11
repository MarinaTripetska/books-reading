import React, { useEffect } from 'react';
import styles from './ModalChoice.module.scss';

interface Props {
  questionTxt: string;
  confirmBtnTxt: string;
  resetBtnTxt: string;
  onConfirmClick: () => void;
  onResetClick: () => void;
}

const ModalChoice: React.FC<Props> = ({
  questionTxt,
  confirmBtnTxt,
  resetBtnTxt,
  onConfirmClick,
  onResetClick,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.text}>{questionTxt}</p>
        <div className={styles.buttonsThumb}>
          <button
            className={styles.resetBtn + ' ' + styles.btn}
            type="button"
            onClick={onResetClick}
          >
            {resetBtnTxt}
          </button>

          <button
            className={styles.confirmBtn + ' ' + styles.btn}
            type="button"
            onClick={onConfirmClick}
          >
            {confirmBtnTxt}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChoice;
