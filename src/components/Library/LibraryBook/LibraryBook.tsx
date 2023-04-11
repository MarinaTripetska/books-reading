import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BookImg } from '../../../assets/img/book.svg';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import DoneEl from './DoneEl';
import styles from './LibraryBook.module.scss';
import { BookProps } from '../library.interfaces';
import { useModal } from '../../../hooks/useModal';
import Portal from '../../Portal';
import publicRoots from '../../../utils/publicRoots';
import ModalUpdate from './ModalUpdate/ModalUpdate';
import ModalChoice from '../../ModalChoice';
import booksApi from '../../../services/books/books-service';
import { statusBook } from '../../../utils/bookStatus';

const LibraryBook: React.FC<BookProps> = ({ book, update, onDelete }) => {
  const { isShown, toggle } = useModal();
  const [isOpenModal, setOpenModal] = useState(false);

  const { t } = useTranslation();

  const onOpenClick = () => {
    setOpenModal(!isOpenModal);
  };

  const onResetClick = () => {
    setOpenModal(!isOpenModal);
  };

  const onConfirmClick = () => {
    booksApi.deleteBook(book._id);
    onDelete(book);
    setOpenModal(!isOpenModal);
  };

  return (
    <li
      className={`${
        book.status === statusBook.DONE ? styles.itemDone : styles.bookItem
      }`}
    >
      <div className={styles.bookName}>
        <BookImg
          className={`${styles.icon} ${
            book.status === statusBook.ACTIVE ? styles.iconActive : ''
          }`}
        />
        <span>{book.name}</span>
      </div>
      <div className={styles.bookInfo}>
        <div>
          <span className={styles.subtitleMob}>{t('library.author')}:</span>
          <span className={styles.subtitle}>{book.author}</span>
        </div>
        <div>
          <span className={styles.subtitleMob}>{t('library.yearShort')}:</span>
          <span className={styles.subtitle}>{book.year}</span>
        </div>
        <div>
          <span className={styles.subtitleMob}>{t('library.pageShort')}:</span>
          <span className={styles.subtitle}>{book.pages}</span>
        </div>
        {book.status === statusBook.DONE ? (
          <DoneEl
            _id={book._id}
            rating={book.rating}
            resume={book.resume}
            onUpdate={update}
          />
        ) : null}
        <button
          className={`${
            book.status === statusBook.DONE
              ? styles.btnEditDone
              : styles.btnEditPending
          }`}
          onClick={toggle}
        >
          <CiEdit title={t('library.edit')} color="#6d7a8d" />
        </button>
        {isShown && (
          <Portal wrapperId={publicRoots.UpdateModal}>
            <ModalUpdate
              book={book}
              isOpen={isShown}
              hide={toggle}
              update={update}
            />
          </Portal>
        )}
        <button
          className={`${
            book.status === statusBook.DONE
              ? styles.btnDelDone
              : styles.btnDelPending
          }`}
          onClick={onOpenClick}
        >
          <AiOutlineDelete color="#a6abb9" />
        </button>
        {isOpenModal && (
          <Portal wrapperId={publicRoots.UpdateModal}>
            <ModalChoice
              questionTxt={t('deleteBookModal.text')}
              confirmBtnTxt={t('deleteBookModal.confirm')}
              resetBtnTxt={t('deleteBookModal.reset')}
              onResetClick={onResetClick}
              onConfirmClick={onConfirmClick}
            />
          </Portal>
        )}
      </div>
    </li>
  );
};

export default LibraryBook;
