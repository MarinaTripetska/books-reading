import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import booksApi from '../../../services/books/books-service';
import trainingApi, {
  ReadingTraining,
} from '../../../services/training/training-service';
import BookStatusI, { statusBook } from '../../../utils/bookStatus';
import countDays from '../../../utils/countDays';
import publicRoots from '../../../utils/publicRoots';
import ModalChoice from '../../ModalChoice';
import Portal from '../../Portal';
import BoolListFull from '../BookListFull/BookListFull';
import BookCounter from '../BookCounter';
import Diagram from '../Diagram';
import Results from '../Results';

import styles from './TrainingFull.module.scss';
import Button from '../Button';
import { ButtonType } from '../Button/Button';
import Countdown from '../../Countdown';

interface Props {
  training: ReadingTraining;
  updateTraining: (training: ReadingTraining | null) => void;
  setBookStatus: (bookId: string, status: BookStatusI) => void;
}

const getNotFinishedBooks = (training: ReadingTraining) => {
  return training.books.filter(({ book }) => book.status === statusBook.ACTIVE);
};

const TrainingFull: React.FC<Props> = ({
  training,
  updateTraining,
  setBookStatus,
}) => {
  const { t } = useTranslation();

  const [isOpenModal, setOpenModal] = useState(false);
  const [notFinishedBooks, setNotFinishedBooks] = useState(
    getNotFinishedBooks(training),
  );

  useEffect(() => {
    setNotFinishedBooks(getNotFinishedBooks(training));
  }, [training]);

  const onClickCheckbox = async (
    bookId: string,
    status: BookStatusI,
    objBookId: string,
  ) => {
    const body = {
      bookId,
      status:
        status === statusBook.ACTIVE ? statusBook.DONE : statusBook.ACTIVE,
    };
    await booksApi.updateBookStatus(body);
    //todo: set results ?
    setBookStatus(objBookId, body.status);
  };

  const onClickDelete = () => {
    setOpenModal(!isOpenModal);
  };

  const onConfirmClick = async () => {
    Promise.all(
      training.books.map(async (book) => {
        await booksApi.updateBookStatus({
          bookId: book.book._id,
          status: statusBook.PENDING,
        });
      }),
    );
    await trainingApi.deleteTraining(training._id);
    updateTraining(null);
  };

  const onResetClick = () => {
    setOpenModal(!isOpenModal);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <div>
          <div className={styles.countdownsWrap}>
            <Countdown title={t('training.yearCountdown')} />
            <Countdown
              finishDate={training.finish}
              title={t('training.goalCountdown')}
            />
          </div>
          <BoolListFull training={training} onCheckboxClick={onClickCheckbox} />
        </div>
        <div>
          <Diagram activeTraining={training} />
        </div>
        <div className={styles.buttonWrap}>
          <Button
            type={ButtonType.done}
            handleClick={onClickDelete}
            title={t('training.removeTraining')}
          />
        </div>
      </div>

      <div className={styles.sidebar}>
        <BookCounter
          books={training.books.length}
          days={countDays(training.start, training.finish)}
          leftReading={notFinishedBooks.length.toString()}
        />

        <Results training={training} updateTraining={updateTraining} />
      </div>

      {isOpenModal && (
        <Portal wrapperId={publicRoots.ChoiceModal}>
          <ModalChoice
            questionTxt={t('training.confirmDeleteTXT')}
            confirmBtnTxt={t('training.confirmDelete')}
            resetBtnTxt={t('training.resetDelete')}
            onConfirmClick={onConfirmClick}
            onResetClick={onResetClick}
          />
        </Portal>
      )}
    </div>
  );
};

export default TrainingFull;
