import React from 'react';
import Logo from '../Logo';
import NavNotAuth from '../NavNotAuth';
import NavAuth from '../NavAuth';
import styles from './Header.module.scss';
import { useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';

export default function Header() {
  const isLogged = useAppSelector(authSelectors.getLoggedOn);

  return (
    <>
      <header className={styles.header}>
        <Logo />
        <nav className={styles.navigation}>
          {isLogged ? <NavAuth /> : <NavNotAuth />}
        </nav>
      </header>
      <LanguageSelector />
    </>
  );
}
