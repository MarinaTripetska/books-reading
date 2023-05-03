import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteError, isRouteErrorResponse, NavLink } from 'react-router-dom';

import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';
import styles from './Page404.module.scss';
import { routs } from '../../router/routs';

interface Props {
  status?: string;
}

const Page404: FC<Props> = ({ status }) => {
  const { t } = useTranslation();
  const isLogged = useAppSelector(authSelectors.getLoggedOn);
  const error = useRouteError();

  //test error status props:
  if (status) {
    return <p>{status}</p>;
  }

  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          {t('404Page.oops')} {error.status}
        </h1>
        <p className={styles.txt1}>{t('404Page.articleNotFound')}</p>
        <p>{t('404Page.pageCanNotBeFound')}</p>
        <p className={styles.txt3}>{error.data}</p>
        <NavLink
          className={styles.link}
          to={isLogged ? routs.LIBRARY : routs.LOGIN}
        >
          {t('404Page.returnToHomepage')}
        </NavLink>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          {t('404Page.oops')} {error.name}
        </h1>
        <p className={styles.txt1}>{t('404Page.unexpectedError')}</p>
        <p>{t('404Page.somethingWentWrong')}</p>
        <p className={styles.txt3}>{error.message}</p>
        <NavLink
          className={styles.link}
          to={isLogged ? routs.LIBRARY : routs.LOGIN}
        >
          {t('404Page.returnToHomepage')}
        </NavLink>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Page404;
