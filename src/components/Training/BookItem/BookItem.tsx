import React from 'react';
import styles from './BookItem.module.scss';
import { Book } from '../../../services/books/books-service';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface Props {
  book: Book;
}

const BookItem: React.FC<Props> = ({ book }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.thumb} key={book._id}>
      <div className={styles.wrapTitles}>
        <div className={classNames(styles.wrapItem, styles.textItem)}>
          <div className={styles.subtitle}></div>
          <p className={(styles.name)}>{book.name}</p>
        </div>
        <div className={classNames(styles.wrapItem, styles.textItem)}>
          <div className={styles.subtitle}>{`${t('training.author')}:`}</div>
          <p className={(styles.author)}>{book.author}</p>
        </div>
        <div className={classNames(styles.wrapItem, styles.numberItem)}>
          <div className={styles.subtitle}>{`${t('training.year')}:`}</div>
          <p className={(styles.year)}>{book.year}</p>
        </div>
        <div className={classNames(styles.wrapItem, styles.numberItem)}>
          <div className={styles.subtitle}>{`${t('training.pages')}:`}</div>
          <p className={(styles.pages)}>{book.pages}</p>
        </div>
      </div>
      <p className={(styles.delete, styles.iconItem)}>
        {/* TODO: INSERT DELETE element here */}
      </p>
    </div>
  );
};

export default BookItem;
