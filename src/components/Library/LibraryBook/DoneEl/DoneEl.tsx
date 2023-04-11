import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../../../hooks/useModal';
import publicRoots from '../../../../utils/publicRoots';
import ModalResume from '../ModalResume';
import Rating from '../Rating';
import Portal from '../../../Portal';
import styles from './DoneEl.module.scss';
import { Book } from '../../../../services/books/books-service';

type Props = {
  _id: string;
  rating: number | null;
  resume: string;
  onUpdate: (updatedBook: Book) => void;
};

const DoneEl: FC<Props> = ({ _id, rating, resume, onUpdate }) => {
  const { isShown, toggle } = useModal();
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.starWrapper}>
        <span className={styles.subtitleMob}>{t('library.resume')}:</span>
        <div>
          <Rating count={5} value={rating || 0} edit={false} />
        </div>
      </div>
      <div>
        <button onClick={toggle} className={styles.resumeBtn}>
          {t('library.resume')}
        </button>
        {isShown && (
          <Portal wrapperId={publicRoots.ResumeModal}>
            <ModalResume
              bookId={_id}
              rating={rating}
              resume={resume}
              isOpen={isShown}
              hide={toggle}
              onUpdate={onUpdate}
            />
          </Portal>
        )}
      </div>
    </>
  );
};

export default DoneEl;
