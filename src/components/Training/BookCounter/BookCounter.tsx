import React from 'react';
import styles from './BookCounter.module.scss';
import Subheader from '../Subheader';
import { useTranslation } from 'react-i18next';
import CountItem from './CountItem';
import CountItemSmall from './CountItemSmall';

interface BookCounterProps {
  books: number | string;
  days: number | string;
  leftReading?: number | string;
}

export default function BookCounter({ books, days, leftReading }: BookCounterProps) {
  const UseCountItem = leftReading ? CountItemSmall : CountItem;
  const { t } = useTranslation();
  return (
    <div className={styles.bookCounter}>
      <div className={styles.subheaderWrap}>
        <Subheader title={t('training.myGoals')} />
      </div>
      <div className={styles.counters}>
        <UseCountItem
          count={books}
          title={t('training.numberOfBooks')}
        />
        <UseCountItem
          count={days}
          title={t('training.numberOfDays')}
        />
        {leftReading && (
          <UseCountItem
            count={leftReading}
            title={t('training.leftBooks')}
            highlight={true}
          />
        )}
      </div>
    </div>
  );
}