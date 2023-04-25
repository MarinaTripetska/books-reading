import React, { useState } from 'react';
import { MdLanguage } from 'react-icons/md';
import '../../locales/i18n';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.module.scss';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('LOCALE', lang);
  };
  return (
    <div className={styles.wrapper} onClick={() => setIsOpen(!isOpen)}>
      <div className={`${styles.list} ${isOpen ? styles.open : ''}`}>
        {i18n.languages.map((lang: string) => (
          <button
            className={`${styles.lang}  ${
              lang === i18n.language ? styles.active : ''
            }`}
            title={lang}
            onClick={() => changeLanguage(lang)}
            key={lang}
          >
            {lang}
            <span>
              <MdLanguage />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
