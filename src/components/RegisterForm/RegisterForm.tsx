import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from '../Input';
import styles from '../LoginForm/LoginForm.module.scss';
import btnStyles from '../Button/Button.module.scss';
import Button from '../Button';
import authOperations from '../../redux/features/auth/authOperations';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { useTranslation } from 'react-i18next';
import authSelectors from '../../redux/features/auth/authSelectors';
import Portal from '../Portal';
import publicRoots from '../../utils/publicRoots';
import Loader from '../Loader';

type RegRes = {
  user: { email: string; name: string };
};

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLoading = useAppSelector(authSelectors.getLoading);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, 'validation.min3')
        .required('validation.required'),
      email: yup
        .string()
        .email('validation.valid')
        .min(5, 'validation.min5')
        .max(50, 'validation.max50')
        .required('validation.required'),
      password: yup
        .string()
        .min(8, 'validation.min8')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'validation.pass')
        .required('validation.required'),
      confirmPassword: yup
        .string()
        .label('confirm password')
        .required('validation.confirm')
        .oneOf([yup.ref('password')], 'validation.noSame'),
    }),
    onSubmit: async (values) => {
      const { name, email, password } = values;
      dispatch(authOperations.register({ name, email, password })).then(
        (res: RegRes) => {
          if (res) {
            navigate('/login', { replace: true });
          }
        },
      );
      formik.resetForm();
    },
  });
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
      <div className={styles.inputWrapper}>
        <Input
          labelName={t('auth.name')}
          name={'name'}
          type={'text'}
          value={formik.values.name}
          handleChange={formik.handleChange}
        />
        {formik.errors.name && formik.touched.name ? (
          <p className={styles.notification}>{t(formik.errors.name)}</p>
        ) : null}
      </div>

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

      <div className={styles.inputWrapper}>
        <Input
          labelName={t('auth.confirm')}
          name={'confirmPassword'}
          type={'password'}
          value={formik.values.confirmPassword}
          handleChange={formik.handleChange}
        />
        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
          <p className={styles.notification}>
            {t(formik.errors.confirmPassword)}
          </p>
        ) : null}
      </div>

      <Button
        handleClick={formik.handleSubmit}
        btnClass={btnStyles.login}
        title={t('auth.register')}
      />
      <span className={styles.textLog}>{t('auth.exAcc')}</span>
      <Link to="/login" className={styles.link}>
        {t('auth.login')}
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
