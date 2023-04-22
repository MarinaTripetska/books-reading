import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import authOperations from '../../redux/features/auth/authOperations';
import authSelectors from '../../redux/features/auth/authSelectors';
import useViewportSizes from '../../hooks/useViewportSizes';
import breakpoints from '../../utils/breakpoints';

import UserName from '../UserName';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

import styles from './NavAuth.module.scss';
import Portal from '../Portal';
import publicRoots from '../../utils/publicRoots';
import ModalChoice from '../ModalChoice';
import Loader from '../Loader';

export default function NavAuth() {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(authSelectors.getUserName);

  const sizes = useViewportSizes();
  const isMobileView = sizes.innerWidth < breakpoints.TABLET;

  const [isOpenModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const isLoading = useAppSelector(authSelectors.getLoading);

  const onLogoutClick = () => {
    setOpenModal(!isOpenModal);
  };

  const onConfirmLogoutClick = () => {
    dispatch(authOperations.logOut());
  };

  const onResetLogoutClick = () => {
    setOpenModal(!isOpenModal);
  };

  return (
    <div className={styles.navWrapper}>
      <UserName userNameStr={userName} />

      {isMobileView && <MobileMenu logoutClick={onLogoutClick} />}

      {!isMobileView && <DesktopMenu logoutClick={onLogoutClick} />}

      {isOpenModal && (
        <Portal wrapperId={publicRoots.ChoiceModal}>
          <ModalChoice
            questionTxt={t('logoutChoiceModal.text')}
            confirmBtnTxt={t('logoutChoiceModal.confirm')}
            resetBtnTxt={t('logoutChoiceModal.reset')}
            onConfirmClick={onConfirmLogoutClick}
            onResetClick={onResetLogoutClick}
          />

          {/* TEST confirmation modal:*/}

          {/* <ModalConfirmation
            iconPath={likeIcon}
            questionTxt={t('confirmationModal.YouAreGoodButNotEnough')}
            confirmBtnTxt={t('confirmationModal.confirm')}
            onConfirmClick={onResetLogoutClick}
          /> */}
        </Portal>
      )}

      {isLoading && isOpenModal && (
        <Portal wrapperId={publicRoots.Loader}>
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        </Portal>
      )}
    </div>
  );
}
