import React from 'react';
import styles from './RegisterPage.module.scss';
import RegisterForm from '../../components/RegisterForm';
import { useTranslation } from 'react-i18next';

export default function RegisterPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.leftSide}>
        <RegisterForm />
      </div>
      <div className={styles.rightSide}>
        <h2 className={styles.title}>Books Reading</h2>
        <div className={styles.text}>
          <p className={styles.subTitle}>{t('auth.regSubTO')}</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>{t('auth.regGoal')}</li>
            <li className={styles.listItem}>{t('auth.regProcess')}</li>
            <li className={styles.listItem}>{t('auth.regSuccess')}</li>
          </ul>
        </div>
        <div className={styles.text}>
          <p className={styles.subTitle}>{t('auth.regSubTT')}</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>{t('auth.regPoint')}</li>
            <li className={styles.listItem}>{t('auth.regScills')}</li>
            <li className={styles.listItem}>{t('auth.regInter')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
