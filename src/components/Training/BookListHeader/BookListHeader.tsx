import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './BookListHeader.module.scss';

const BookListHeader = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.thumb}>
      <div className={styles.wrapTitles}>
        <p className={(styles.name, styles.textItem)}>{t('training.bookTitle')}</p>
        <p className={(styles.author, styles.textItem)}>{t('training.author')}</p>
        <p className={(styles.year, styles.numberItem)}>{t('training.year')}</p>
        <p className={(styles.pages, styles.numberItem)}>{t('training.pages')}</p>
      </div>
      <p className={(styles.delete, styles.iconItem)}></p>
    </div>
  );
};

export default BookListHeader;
