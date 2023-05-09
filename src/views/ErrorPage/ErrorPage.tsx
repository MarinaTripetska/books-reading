import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteError, isRouteErrorResponse, NavLink } from 'react-router-dom';

import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';
import styles from './ErrorPage.module.scss';
import { routs } from '../../router/routs';

const ErrorPage = () => {
  const { t } = useTranslation();
  const isLogged = useAppSelector(authSelectors.getLoggedOn);
  const error = useRouteError();

  return (
    <div className={styles.container}>
      {isRouteErrorResponse(error) && (
        <>
          <h1 className={styles.title}>
            {t('ErrorPage.oops')} {error.status}
          </h1>

          {error.status === 404 ? (
            <>
              <p className={styles.txt1}>{t('ErrorPage.articleNotFound')}</p>
              <p>{t('ErrorPage.pageCanNotBeFound')}</p>
              <p className={styles.txt3}>{error.data}</p>
            </>
          ) : (
            <>
              <p className={styles.txt1}>{error.statusText}</p>
              <p className={styles.txt3}>{error.data}</p>
            </>
          )}
        </>
      )}

      {error instanceof Error && (
        <>
          <p className={styles.txt1}>{t('ErrorPage.unexpectedError')}</p>
          <p>{t('ErrorPage.somethingWentWrong')}</p>
          <p className={styles.txt3}>{error.message}</p>
        </>
      )}

      <NavLink
        className={styles.link}
        to={isLogged ? routs.LIBRARY : routs.LOGIN}
      >
        {t('ErrorPage.returnToHomepage')}
      </NavLink>
    </div>
  );
};

export default ErrorPage;
