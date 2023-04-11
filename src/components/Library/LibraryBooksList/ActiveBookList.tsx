import React from 'react';

import { ReactComponent as BookImg } from '../../../assets/img/book.svg';
import styles from '../../Library/LibraryBook/LibraryBook.module.scss';
import { Book } from '../../../services/books/books-service';
import { BooksI } from '../library.interfaces';

const ActiveBookList = ({ books }: BooksI) => {
  return (
    <ul>
      {books?.map((book: Book, i: number) => (
        <li className={styles.bookItem} key={i}>
          <div className={styles.bookName}>
            <BookImg className={`${styles.icon} ${styles.iconActive}`} />
            <span>{book.name}</span>
          </div>
          <div className={styles.bookInfo}>
            <div>
              <span className={styles.subtitleMob}>Author:</span>
              <span className={styles.subtitle}>{book.author}</span>
            </div>
            <div>
              <span className={styles.subtitleMob}>Year:</span>
              <span className={styles.subtitle}>{book.year}</span>
            </div>
            <div>
              <span className={styles.subtitleMob}>Pages:</span>
              <span className={styles.subtitle}>{book.pages}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActiveBookList;
