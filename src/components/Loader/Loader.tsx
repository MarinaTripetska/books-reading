import React from 'react';
import {Watch} from 'react-loader-spinner';
import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div>
      <div className={styles.wrapper}>
        <Watch
          color="#fc842d"
          height={80}
          width={80}
          ariaLabel="watch-loading"
          radius="48"
        />
      </div>
    </div>
  );
}
