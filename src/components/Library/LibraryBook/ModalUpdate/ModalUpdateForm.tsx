import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import Input from '../../../Input';
import { Book } from '../../../../services/books/books-service';
import formStyles from '../../LibraryForm/LibraryForm.module.scss';
import btnStyles from '../../LibraryBook/ModalResume/ModalResume.module.scss';
import booksApi from '../../../../services/books/books-service';

export interface Props {
  book: Book;
  hide: () => void;
  onUpdate: (udatedBook: Book) => void;
}

const ModalUpdateForm: FC<Props> = ({ book, hide, onUpdate }) => {
  const { name, author, year, pages, status, _id } = book;
  const bookId = _id;

  const initialValues = {
    name: name,
    author: author,
    year: year.toString(),
    pages: pages.toString(),
    status: status,
  };

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      name: yup
        .string()
        .min(1, 'validation.min1')
        .max(100, 'validation.max100')
        .required('validation.required'),
      author: yup
        .string()
        .min(1, 'validation.min3')
        .max(100, 'validation.max100')
        .required('validation.required'),
      year: yup
        .string()
        .matches(/^[0-9]*$/, 'validation.year')
        .min(1, 'validation.min1')
        .max(4, 'validation.max4'),
      pages: yup
        .string()
        .matches(/^[0-9]*$/, 'validation.pages')
        .min(1, 'validation.min1')
        .max(5, 'validation.max5')
        .required('validation.required'),
      status: yup.string(),
    }),

    onSubmit: async (values) => {
      const { name, author, year, pages, status } = values;
      const updatedBook = await booksApi.updateBookInfo({
        bookId,
        name,
        author,
        year,
        pages,
        status,
      });
      onUpdate(updatedBook.data);
      hide();
      formik.resetForm();
    },
  });

  return (
    <div className={formStyles.modalFormWrapper}>
      <form
        className={formStyles.formUpdate}
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            formik.handleSubmit();
          }
        }}
      >
        <div className={formStyles.inputModal}>
          <Input
            labelName={t('library.title')}
            name={'name'}
            type={'text'}
            value={formik.values.name}
            handleChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name ? (
            <p className={formStyles.notification}>{t(formik.errors.name)}</p>
          ) : null}
        </div>

        <div
          className={`${formStyles.inputModal} ${t(formStyles.wrapperAuthor)}`}
        >
          <Input
            labelName={t('library.author')}
            name={'author'}
            type={'text'}
            value={formik.values.author}
            handleChange={formik.handleChange}
          />
          {formik.errors.author && formik.touched.author ? (
            <p className={formStyles.notification}>{t(formik.errors.author)}</p>
          ) : null}
        </div>
        <div className={formStyles.inputModal}>
          <Input
            labelName={t('library.year')}
            name={'year'}
            type={'text'}
            value={formik.values.year}
            handleChange={formik.handleChange}
          />
          {formik.errors.year && formik.touched.year ? (
            <p className={formStyles.notification}>{t(formik.errors.year)}</p>
          ) : null}
        </div>
        <div className={formStyles.inputModal}>
          <Input
            labelName={t('library.page')}
            name={'pages'}
            type={'text'}
            value={formik.values.pages}
            handleChange={formik.handleChange}
          />
          {formik.errors.pages && formik.touched.pages ? (
            <p className={formStyles.notification}>{t(formik.errors.pages)}</p>
          ) : null}
        </div>
        <div className={formStyles.radioWrapper}>
          <div className={formStyles.customRadio}>
            <label className={formStyles.radioLabelWrapper}>
              <input
                className={formStyles.radioInput}
                type="radio"
                name="status"
                value="done"
                defaultChecked={formik.values.status === 'done'}
                onChange={formik.handleChange}
              />
              <div className={formStyles.radioLabel}>
                {t('library.status-done')}
              </div>
            </label>
          </div>
          <div className={formStyles.customRadio}>
            <label className={formStyles.radioLabelWrapper}>
              <input
                className={formStyles.radioInput}
                type="radio"
                name="status"
                value="pending"
                defaultChecked={formik.values.status === 'pending'}
                onChange={formik.handleChange}
              />
              <div className={formStyles.radioLabel}>
                {t('library.status-pending')}
              </div>
            </label>
          </div>
        </div>
        <div className={btnStyles.btnWrapper}>
          <button className={btnStyles.closeBtn} onClick={hide}>
            {t('library.back')}
          </button>
          <button type="submit" className={btnStyles.saveBtn}>
            {t('library.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalUpdateForm;
