import React from 'react';
import { ReadingTraining } from '../../../services/training/training-service';
import BookStatusI from '../../../utils/bookStatus';
import BookItem from '../BookItem';
import BookListHeader from '../BookListHeader';
import Checkbox from '../Checkbox';
import styles from './BookListFull.module.scss';

interface Props {
  training: ReadingTraining;
  onCheckboxClick: (
    bookId: string,
    status: BookStatusI,
    objBookId: string,
  ) => void;
}

const BoolListFull: React.FC<Props> = ({ training, onCheckboxClick }) => {
  return (
    <div>
      <BookListHeader />
      <ul>
        {training.books.map((bookObj) => {
          const { book, _id } = bookObj;
          return (
            <li key={_id} className={styles.item}>
              <Checkbox
                status={book.status}
                clb={() => onCheckboxClick(book._id, book.status, _id)}
              />
              <BookItem book={book} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default BoolListFull;
