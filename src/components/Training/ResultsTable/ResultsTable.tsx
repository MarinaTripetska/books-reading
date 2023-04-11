import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Result } from '../Results/Results';
import styles from './ResultsTable.module.scss';

interface Props {
  results: Result[];
  // onRemove: (id: number) => void;
}

const ResultsTable: FC<Props> = ({ results }) => {
  const { t } = useTranslation();
  return (
    <table className={styles.table}>
      <caption className={styles.title}>{t('training.statistics')}</caption>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.date}</td>
            <td className={styles.time}>{result.time}</td>
            <td>{result.pages + ' ' + t('training.page')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
