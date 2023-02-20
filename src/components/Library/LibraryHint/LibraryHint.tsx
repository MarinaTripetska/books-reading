import React from 'react';
import styles from './LibraryHint.module.scss';
import { ReactComponent as Flag } from '../../../assets/img/flag.svg';
import { ReactComponent as Arr } from '../../../assets/img/ancle-arr.svg';
import { ReactComponent as Book } from '../../../assets/img/book.svg';
import { useTranslation } from 'react-i18next';

export default function LibraryHint() {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <ul>
        <li className={styles.item}>
          <h3 className={styles.title}>{t('library.step')} 1</h3>
          <div className={styles.blockTitle}>
            <Book className={styles.icon} />
            <h4 className={styles.subtitle}>{t('library.createLib')}</h4>
          </div>
          <div className={styles.blockText}>
            <Arr />
            <span className={styles.text}>{t('library.createLibDo')}</span>
          </div>
        </li>
        <li className={styles.item}>
          <h3 className={styles.title}>{t('library.step')} 2</h3>
          <div className={styles.blockTitle}>
            <Flag className={styles.icon} />
            <h4 className={styles.subtitle}>{t('library.createTrain')}</h4>
          </div>
          <div className={styles.blockText}>
            <Arr />
            <span className={styles.text}>{t('library.createTrainDo')}</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
