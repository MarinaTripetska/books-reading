import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';
import styles from './Page404.module.scss';

export default function Page404() {
  const { t } = useTranslation();
  const isLogged = useAppSelector(authSelectors.getLoggedOn);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.txt1}>{t('404Page.articleNotFound')}</p>
      <p className={styles.txt2}>{t('404Page.pageCanNotBeFound')}</p>
      <Link className={styles.link} to={isLogged ? '/library' : '/login'}>
        {t('404Page.returnToHomepage')}
      </Link>
    </div>
  );
}
