import React, { useState } from 'react';
import styles from './MobileMenu.module.scss';
import Hamburger from '../../Hamburger';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ReactComponent as SvgLibrary } from '../../../assets/img/book.svg';
import { ReactComponent as SvgHome } from '../../../assets/img/home.svg';
import useViewportSizes from '../../../hooks/useViewportSizes';
import breakpoints from '../../../utils/breakpoints';

interface Props {
  logoutClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MobileMenu: React.FC<Props> = ({ logoutClick }) => {
  const { innerWidth } = useViewportSizes();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleHamburger = () => {
    setMenuOpen(!menuOpen);
  };

  const onLinkClick = () => {
    if (innerWidth <= breakpoints.LargeMobile) {
      toggleHamburger();
    }
  };

  return (
    <>
      <div
        onClick={toggleHamburger}
        className={classNames(styles.overlay, menuOpen && styles.openMenu)}
      ></div>
      <div
        className={classNames(styles.contentBox, menuOpen && styles.openMenu)}
      >
        <div className={styles.list}>
          <NavLink
            className={styles.link}
            to={'/library'}
            onClick={onLinkClick}
          >
            <SvgLibrary />
            {t('navigation.library')}
          </NavLink>
          <NavLink
            className={styles.link}
            to={'/training'}
            onClick={onLinkClick}
          >
            <SvgHome /> {t('navigation.training')}
          </NavLink>
          <button
            className={styles.logoutBtn}
            type="button"
            onClick={logoutClick}
          >
            {t('auth.logout')}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleHamburger}
        className={classNames(styles.burgerBtn, menuOpen && styles.openMenu)}
      >
        <Hamburger isOpen={menuOpen} />
      </button>
    </>
  );
};

export default MobileMenu;
