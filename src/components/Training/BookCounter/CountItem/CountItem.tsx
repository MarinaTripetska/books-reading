import React from 'react';
import styles from './CountItem.module.scss';

interface CountItemProps {
  count: number | string;
  title: string;

}

export default function CountItem({ count, title }: CountItemProps) {

  return (
    <div className={styles.countItem}>
      <div className={styles.countBlock}>
        <div className={styles.counter}>
          {count}
        </div>
      </div>
      <div className={styles.countTitle}>
        {title}
      </div>
    </div >
  );
}