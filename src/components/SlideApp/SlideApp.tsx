import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SlideApp.module.scss';

interface Props {
  srcPath: string;
  cases1: string[];
  cases2: string[];
  title: string;
}

const SlideApp: React.FC<Props> = ({ srcPath, cases1, cases2, title }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <h3 className={styles.title}>{title}</h3>

        <h4 className={styles.subTitle}>{t('introPage.helpYou')}</h4>
        <ul className={styles.list}>
          {cases1.map((item, i) => (
            <li className={styles.item} key={i}>
              {item}
            </li>
          ))}
        </ul>

        <h4 className={styles.subTitle}>{t('introPage.youMayAlso')}</h4>
        <ul className={styles.list}>
          {cases2.map((item, i) => (
            <li className={styles.item} key={i}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.imageBox}>
        <img src={srcPath} alt="" className={styles.image} />
      </div>
    </div>
  );
};

export default SlideApp;
