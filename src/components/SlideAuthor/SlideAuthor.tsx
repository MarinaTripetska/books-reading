import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SlideAuthor.module.scss';

interface Props {
  name: string;
  role: string;
  srcPath: string;
  gitHubPath: string;
  cases: string[];
}

const SlideAuthor: React.FC<Props> = ({
  name,
  role,
  srcPath,
  gitHubPath,
  cases,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <img src={srcPath} alt="" className={styles.image} />
      </div>

      <div className={styles.contentBox}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>
        <ul className={styles.list}>
          {cases.map((item, i) => (
            <li className={styles.item} key={i}>
              {item}
            </li>
          ))}
        </ul>
        <a
          className={styles.link}
          href={gitHubPath}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('introPage.seeMore')}
        </a>
      </div>
    </div>
  );
};

export default SlideAuthor;
