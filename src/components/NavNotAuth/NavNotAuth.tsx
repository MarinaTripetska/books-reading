import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavNotAuth.module.scss';
import { useTranslation } from 'react-i18next';
import { routs } from '../../router/routs';

export default function NavNotAuth() {
  const { t } = useTranslation();

  return (
    <div className={styles.navWrapper}>
      <NavLink to={routs.LOGIN} className={styles.navLink}>
        {t('auth.login')}
      </NavLink>
      <NavLink to={routs.REGISTRATION} className={styles.navLink}>
        {t('auth.register')}
      </NavLink>
    </div>
  );
}
