import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from '../Input';
import styles from './LoginForm.module.scss';
import btnStyles from '../Button/Button.module.scss';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import authOperations from '../../redux/features/auth/authOperations';
import { useTranslation } from 'react-i18next';
import Portal from '../Portal';
import publicRoots from '../../utils/publicRoots';
import Loader from '../Loader';
import authSelectors from '../../redux/features/auth/authSelectors';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isLoading = useAppSelector(authSelectors.getLoading);

  const initialValues = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      email: yup
        .string()
        .email('validation.valid')
        .min(5, 'validation.min5')
        .max(50, 'validation.max50')
        .required('validation.required'),
      password: yup
        .string()
        .min(8, 'validation.min8')
        .matches(/[A-z0-9]/, 'validation.pass')
        .required('validation.required'),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      dispatch(authOperations.logIn({ email, password }));
      formik.resetForm();
    },
  });

  // const handleGoogleBtnClick = () => {
  //   console.log('GoggleBtn');
  // };

  return (
    <form
      className={styles.form}
      onSubmit={formik.handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          formik.handleSubmit();
        }
      }}
    >
      {/* <Button
        handleClick={handleGoogleBtnClick}
        btnClass={btnStyles.google}
        title={'Google'}
      /> */}
      <div className={styles.inputWrapper}>
        <Input
          labelName={t('auth.email')}
          name={'email'}
          type={'text'}
          value={formik.values.email.toLowerCase()}
          handleChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className={styles.notification}>{t(formik.errors.email)}</p>
        ) : null}
      </div>
      <div className={styles.inputWrapper}>
        <Input
          labelName={t('auth.password')}
          name={'password'}
          type={'password'}
          value={formik.values.password}
          handleChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className={styles.notification}>{t(formik.errors.password)}</p>
        ) : null}
      </div>

      <Button
        handleClick={formik.handleSubmit}
        btnClass={btnStyles.login}
        title={t('auth.login')}
      />
      <Link className={styles.link} to="/register">
        {t('auth.register')}
      </Link>

      {isLoading && (
        <Portal wrapperId={publicRoots.Loader}>
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        </Portal>
      )}
    </form>
  );
}
