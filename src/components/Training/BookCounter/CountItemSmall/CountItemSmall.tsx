import React from 'react';
import styles from './CountItemSmall.module.scss';

interface CountItemProps {
  count: number | string;
  title: string;
  highlight?: boolean;
}

export default function CountItem({ count, title, highlight = false }: CountItemProps) {

  return (
    <div className={styles.countItem}>
      <div className={styles.countBlock}>
        <div className={`${styles.counter} ${highlight ? styles.counterHighlight : ''}`}>
          {count}
        </div>
      </div>
      <div className={styles.countTitle}>
        {title}
      </div>
    </div >
  );
}