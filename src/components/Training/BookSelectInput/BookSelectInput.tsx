import React, { FC } from 'react';
import { Formik, Field } from 'formik';
import styles from './BookSelectInput.module.scss';

import { Book } from '../../../services/books/books-service';
import { useTranslation } from 'react-i18next';

type Props = {
  books: Book[];
  onAddActive: (newBook: Book) => void;
};

const BookSelectInput: FC<Props> = ({ books, onAddActive }) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ book: '' }}
      onSubmit={(values, actions) => {
        const selectedBook = JSON.parse(values.book);
        onAddActive(selectedBook);
        actions.resetForm({ values: { book: '' } });
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Field name="book" as="select" className={styles.select}>
            <option value="" className={styles.option}>
              {t('training.chooseBookFromLibrary')}
            </option>
            {books.map((book) => (
              <option key={book._id} value={JSON.stringify(book)}>
                {book.name}
              </option>
            ))}
          </Field>
          <div className={styles.buttonWrap}>
            <button type="submit" className={styles.btn_add}>
              {t('training.add')}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default BookSelectInput;
