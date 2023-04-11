import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import Rating from '../Rating';
import styles from './ModalResume.module.scss';
import { useTranslation } from 'react-i18next';
import booksApi, { Book } from '../../../../services/books/books-service';

export interface ModalProps {
  bookId: string;
  isOpen: boolean;
  hide: () => void;
  resume: string;
  rating: number | null;
  onUpdate: (updatedBook: Book) => void;
}

const ModalResume: FunctionComponent<ModalProps> = ({
  bookId,
  rating,
  resume,
  isOpen,
  hide,
  onUpdate,
}) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState(resume);
  const [newRating, setNewRating] = React.useState(() => (rating ? rating : 0));

  const handleResume = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleChanges = async () => {
    const objForSending: {
      bookId: string;
      resume?: string;
      rating?: number;
    } = {
      bookId,
    };

    if (message !== '') {
      objForSending.resume = message;
    }
    if (newRating !== 0) {
      objForSending.rating = newRating;
    }

    if (objForSending.rating || objForSending.resume) {
      const updatedBook = await booksApi.updateBookResume(objForSending);
      onUpdate(updatedBook?.data);
    }
    hide();
  };

  return isOpen ? (
    <div className={styles.backdrop}>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div className={styles.ratingWrapper}>
            <h3 className={styles.title}>{t('library.leftRating')}</h3>
            <Rating
              count={5}
              value={newRating}
              edit={true}
              onChange={(value) => setNewRating(value)}
            />
          </div>
          <div>
            <h3 className={styles.title}>{t('library.resume')}</h3>
            <textarea
              className={styles.tetxarea}
              name="feedback"
              value={message}
              rows={10}
              maxLength={600}
              placeholder="Leave your feedback..."
              onChange={handleResume}
            />
          </div>
          <div className={styles.btnWrapper}>
            <button className={styles.closeBtn} onClick={hide}>
              {t('library.back')}
            </button>
            <button className={styles.saveBtn} onClick={handleChanges}>
              {t('library.save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalResume;
