import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './ResultsForm.module.scss';
import { useTranslation } from 'react-i18next';

interface ResultFormProps {
  onSubmitForm: (
    values: { date: string; pages: number },
    dateToSend: string,
  ) => void;
  startTrainingDate: string;
  leftPages: number;
}

interface ResultFormValues {
  date: string;
  pages: number;
}

const ResultsForm: FC<ResultFormProps> = ({
  startTrainingDate,
  leftPages,
  onSubmitForm,
}) => {
  const { t } = useTranslation();
  const ResultsFormSchema = Yup.object().shape({
    date: Yup.date().max(new Date()).required(),
    pages: Yup.number()
      .max(leftPages, `Max ${leftPages} or less`)
      .min(1, 'Min 1 page')
      .required(),
  });

  const formik = useFormik<ResultFormValues>({
    initialValues: {
      date: '',
      pages: 0,
    },
    validationSchema: ResultsFormSchema,
    onSubmit: (values) => {
      const now = new Date();
      const result = {
        date: values.date,
        time: now.toLocaleTimeString(),
        pages: values.pages,
      };
      const dateToSend = now.toISOString().replace('T', ' ');
      onSubmitForm(result, dateToSend);
      formik.resetForm();
    },
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;

  const isFormValid =
    Object.keys(errors).length === 0 && Object.keys(touched).length !== 0;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <div>
          <label htmlFor="date" className={styles.label}>
            {t('training.date')}
          </label>
          <input
            className={styles.input}
            id="date"
            name="date"
            type="date"
            max={new Date().toISOString().slice(0, 10)}
            min={startTrainingDate.slice(0, 10)}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.date}
          />
          {errors.date && touched.date ? <div>{errors.date}</div> : null}
        </div>

        <div>
          <label htmlFor="pages" className={styles.label}>
            {t('training.amountOfPages')}
          </label>
          <input
            className={styles.input}
            id="pages"
            name="pages"
            type="number"
            max={leftPages}
            onChange={handleChange}
            value={values.pages}
          />
          {errors.pages && touched.pages ? <div>{errors.pages}</div> : null}
        </div>
      </div>

      <button type="submit" disabled={!isFormValid} className={styles.button}>
        {t('training.addResult')}
      </button>
    </form>
  );
};

export default ResultsForm;
