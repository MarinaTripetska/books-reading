import React from 'react';
import styles from './DesktopMenu.module.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as SvgLibrary } from '../../../assets/img/book.svg';
import { ReactComponent as SvgHome } from '../../../assets/img/home.svg';
import { useTranslation } from 'react-i18next';
import { routs } from '../../../router/routs';

interface Props {
  logoutClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const DesktopMenu: React.FC<Props> = ({ logoutClick }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.linksWrapper}>
      <NavLink className={styles.navLink} to={routs.LIBRARY}>
        <SvgLibrary />
      </NavLink>
      <NavLink className={styles.navLink} to={routs.TRAINING}>
        <SvgHome />
      </NavLink>

      <button type="button" className={styles.logoutBtn} onClick={logoutClick}>
        {t('auth.logout')}
      </button>
    </div>
  );
};

export default DesktopMenu;
