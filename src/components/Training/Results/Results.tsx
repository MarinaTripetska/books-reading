import React, { useState, FC, useEffect } from 'react';
import styles from './Results.module.scss';
import ResultsForm from '../ResultsForm';
import ResultsTable from '../ResultsTable';
import { toast } from 'react-toastify';
import trainingApi, {
  Statistics,
  ReadingTraining,
} from '../../../services/training/training-service';
import Portal from '../../Portal';
import { useTranslation } from 'react-i18next';
import ModalConfirmation from '../../ModalConfirmation';
import publicRoots from '../../../utils/publicRoots';
import { statusBook } from '../../../utils/bookStatus';
import booksApi from '../../../services/books/books-service';

interface ResultsProps {
  training: ReadingTraining;
  updateTraining: (training: ReadingTraining | null) => void;
}

export interface Result {
  date: string;
  time: string;
  pages: number;
}

const Results: FC<ResultsProps> = ({ training, updateTraining }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [leftPages, setLeftPages] = useState<number>(training.totalPages);
  const [isOpenModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (training.statistics) {
      const updatedStatistics = transformStatistics(training.statistics);
      setResults(updatedStatistics);
      setLeftPages(training.totalPages - training.readPages);
    }
    if (training.totalPages - training.readPages === 0) {
      setOpenModal(true);
    }
  }, [training]);

  const onConfirmClick = async () => {
    Promise.all(
      training.books.map(async (book) => {
        await booksApi.updateBookStatus({
          bookId: book.book._id,
          status: statusBook.DONE,
        });
      }),
    );
    await trainingApi.deleteTraining(training._id);
    updateTraining(null);
  };

  const transformStatistics = (arr: Statistics[]) => {
    return arr.map((el) => {
      const dateObj = new Date(el.date);
      const date = dateObj.toISOString().slice(0, 10);
      const time = dateObj.toLocaleTimeString([], { hour12: false });
      return {
        date,
        time,
        pages: el.pages,
      };
    });
  };

  const handleFormSubmit = async (
    values: { date: string; pages: number },
    dateToSend: string,
  ) => {
    const freshAddedTraining = await trainingApi.addResults({
      date: dateToSend,
      pages: values.pages,
      trainingId: training._id,
    });
    if (freshAddedTraining.statistics) {
      const newResult = transformStatistics(freshAddedTraining.statistics);
      updateTraining(freshAddedTraining);
      setResults([...newResult]);
      const left = training.totalPages - training.readPages;
      setLeftPages(left);
      toast.success('Результат успішно додано!');
      if (freshAddedTraining.totalPages - freshAddedTraining.readPages === 0) {
        setOpenModal(true);
      }
    }
  };

  return (
    <div className={styles.resultsWrapper}>
      <h3 className={styles.title}>results</h3>
      <ResultsForm
        onSubmitForm={handleFormSubmit}
        startTrainingDate={training.start}
        leftPages={leftPages}
      />
      <ResultsTable results={results} />
      {isOpenModal && (
        <Portal wrapperId={publicRoots.ConfirmModal}>
          <ModalConfirmation
            questionTxt={t('training.congrats')}
            confirmBtnTxt={t('confirmationModal.confirm')}
            onConfirmClick={onConfirmClick}
          />
        </Portal>
      )}
    </div>
  );
};

export default Results;
