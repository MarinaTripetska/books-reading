import React from 'react';
import styles from './Subheader.module.scss';

interface SubheaderProps {
  title: string;
}

export default function Subheader({ title }: SubheaderProps) {
  return (
    <div className={styles.subheader}>
      <div className={styles.subheaderText}>
        {title}
      </div>
    </div>
  );
}