import React, { useState, useEffect, FC } from 'react';
import styles from './TrainingEmpty.module.scss';
import booksApi, { Book } from '../../../services/books/books-service';
import BookCounter from '../BookCounter';
import AddTrainingBlock from '../AddTrainingBlock';
import moment from 'moment';
import trainingApi, {
  ReadingTraining,
} from '../../../services/training/training-service';
import Diagram from '../Diagram';

type Props = {
  changeTraining: (training: ReadingTraining) => void;
};

const TrainingEmpty: FC<Props> = ({ changeTraining }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [finishDate, setFinishDate] = useState<string>('');
  const [bookCounterDays, setBookCounterDays] = useState<number>(0);
  const [pendingBooks, setPendingBooks] = useState<Book[]>([]);
  const [booksActive, setActiveBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (startDate && finishDate) {
      const days = moment(finishDate).diff(moment(startDate), 'days');
      setBookCounterDays(days);
    }
  }, [startDate, finishDate]);

  const getPendingBooks = async () => {
    const { data } = await booksApi.getBooksByStatus('pending');
    setPendingBooks(data);
  };

  useEffect(() => {
    getPendingBooks();
  }, []);

  const onAddToList = (newBook: Book) => {
    setActiveBooks([...booksActive, newBook]);

    const updatedBooks = pendingBooks.filter(
      (book) => book._id !== newBook._id,
    );
    setPendingBooks(updatedBooks);
  };

  const onDeleteFromList = (deletedBook: Book) => {
    setPendingBooks([...pendingBooks, deletedBook]);
    const updatedBooks = booksActive.filter(
      (book) => book._id !== deletedBook._id,
    );
    setActiveBooks(updatedBooks);
  };

  const onCreateTraining = async (
    startDate: string,
    endDate: string,
    books: Book[],
  ) => {
    const newTraining = await trainingApi.createTraining({
      start: startDate.replace('T', ' '),
      finish: endDate.replace('T', ' '),
      books: books.map((book) => {
        return { book: book._id };
      }),
    });
    if (newTraining) {
      Promise.all(
        books.map(async (book) => {
          await booksApi.updateBookStatus({
            bookId: book._id,
            status: 'active',
          });
        }),
      ).then(async () => {
        const newTrainingActual = await trainingApi.getActiveTraining();
        if (newTrainingActual && newTrainingActual.length > 0) {
          changeTraining(newTrainingActual[0]);
        }
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <AddTrainingBlock
          books={pendingBooks}
          activeBooks={booksActive}
          onAddActive={onAddToList}
          onDeleteAdded={onDeleteFromList}
          handleCreateTraining={onCreateTraining}
          setStartDateEmptyC={setStartDate}
          setFinishDateEmptyC={setFinishDate}
        />
        <Diagram
          createTraining={{ books: booksActive, startDate, finishDate }}
        />
      </div>
      <div className={styles.sidebar}>
        <BookCounter books={booksActive.length} days={bookCounterDays} />
      </div>
    </div>
  );
};

export default TrainingEmpty;
