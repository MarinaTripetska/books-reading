import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Book } from '../../../services/books/books-service';
import Calendar from '../../Calendar';
import BookSelectInput from '../BookSelectInput';
import BookListEmpty from '../BookListEmpty';
import styles from './AddTrainingBlock.module.scss';
import Subheader from '../Subheader';
import classNames from 'classnames';
import ButtonBack from '../../ButtonBack';
import Button from '../Button';
import { ButtonType } from '../Button/Button';

// import { string } from 'yup/lib/locale';

const checkPermissionCreate = (books: Book[], endDate: string) => {
  if (endDate === '') {
    toast.error('Add Finish Date!');
    return false;
  } else if (!books.length) {
    toast.error('Add book in your training!');
    return false;
  }
  return true;
};

type Props = {
  books: Book[];
  activeBooks: Book[];
  setStartDateEmptyC: React.Dispatch<React.SetStateAction<string>>;
  setFinishDateEmptyC: React.Dispatch<React.SetStateAction<string>>;
  onAddActive: (newBook: Book) => void;
  onDeleteAdded: (deletedBook: Book) => void;
  handleCreateTraining: (
    startDate: string,
    endDate: string,
    books: Book[],
  ) => Promise<void>;
};

const AddTrainingBlock: FC<Props> = ({
  books,
  activeBooks,
  onAddActive,
  onDeleteAdded,
  handleCreateTraining,
  setStartDateEmptyC,
  setFinishDateEmptyC,
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  // const [bookCounterDays, setBookCounterDays] = useState<number>(0);
  const [controlPanelOpen, setControlPanelOpen] = useState(false);

  const updateStartDay = (date: string) => {
    setStartDateEmptyC(date);
    setStartDate(date);
  };

  const updateFinishDate = (date: string) => {
    setFinishDateEmptyC(date);
    setEndDate(date);
  };

  const toggleStateControlPanel = () => {
    setControlPanelOpen(!controlPanelOpen);
  };

  const { t } = useTranslation();

  const createTraining = () => {
    if (checkPermissionCreate(activeBooks, endDate)) {
      handleCreateTraining(startDate, endDate, activeBooks);
    }
  };

  return (
    <div className={styles.addTrainingWrapper}>
      <div
        className={classNames(
          styles.overlayControlPanel,
          controlPanelOpen && styles.openControlPanel,
        )}
      >
        <div className={classNames(styles.controlPanel)}>
          <div
            className={classNames(
              styles.buttonBackWrap,
              !controlPanelOpen && styles.hidden,
            )}
          >
            <ButtonBack handleClick={toggleStateControlPanel} />
          </div>
          <Subheader title={t('training.myTraining')} />
          <div className={styles.calendarsWrap}>
            <Calendar
              placeHolder={t('training.start')}
              today={true}
              open={true}
              updateDate={updateStartDay}
            />
            <Calendar
              placeHolder={t('training.finish')}
              onlyAfter={true}
              updateDate={updateFinishDate}
            />
          </div>
          <div className={styles.selectWrap}>
            <div className={styles.dropdownWrap}>
              <BookSelectInput books={books} onAddActive={onAddActive} />
            </div>
          </div>
        </div>
      </div>

      <div className={classNames(styles.btnPLusWrap)}>
        <Button
          type={ButtonType.plus}
          handleClick={() => {
            toggleStateControlPanel();
          }}
        />
      </div>
      <BookListEmpty activeBooks={activeBooks} onDeleteAdded={onDeleteAdded} />
      <div className={styles.buttonDoneWrap}>
        <Button
          type={ButtonType.done}
          handleClick={createTraining}
          title={t('training.startTaining')}
        />
      </div>
    </div>
  );
};

export default AddTrainingBlock;
