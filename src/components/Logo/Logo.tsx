import React from 'react';
import { ReactComponent as LogoImage } from '../../assets/img/logo.svg';
import styles from './Logo.module.scss';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';

export default function Logo() {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);

  return (
    <NavLink to={isLogged ? '/library' : '/'}>
      <LogoImage width={28} height={27} className={styles.logoImg} />
    </NavLink>
  );
}
