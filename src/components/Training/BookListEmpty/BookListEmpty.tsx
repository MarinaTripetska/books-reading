import React, { FC } from 'react';
import BookListHeader from '../BookListHeader';
import { Book } from '../../../services/books/books-service';
import { ReactComponent as BookImg } from '../../../assets/img/book.svg';
import { AiOutlineDelete } from 'react-icons/ai';
import BookItem from '../BookItem';
import styles from './BookListEmpty.module.scss';

type Props = {
  activeBooks: Book[];
  onDeleteAdded: (deletedBook: Book) => void;
};

const BookListEmpty: FC<Props> = ({ activeBooks, onDeleteAdded }) => {
  return (
    <div>
      <BookListHeader />
      <ul>
        {activeBooks.map((book) => {
          return (
            <li className={styles.bookName} key={book._id}>
              <BookImg className={styles.iconBook} />
              <div className={styles.bookItem}>
                <BookItem key={book._id} book={book} />
              </div>
              <button
                className={styles.btnDel}
                onClick={() => onDeleteAdded(book)}
              >
                <AiOutlineDelete color="#a6abb9" style={{ fontSize: '20px' }} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookListEmpty;
