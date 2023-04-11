import React, { useState, useEffect } from 'react';
import styles from './Countdown.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  finishDate?: string;
  title?: string;
}

interface Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<Props> = ({ finishDate, title }) => {
  const { t } = useTranslation();
  const defaultFinishDate = new Date(new Date().getFullYear() + 1, 0, 1).toISOString();
  const [remainingTime, setRemainingTime] = useState<Time>(getTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(getTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getTimeRemaining(): Time {
    const targetDate = finishDate ? new Date(finishDate) : new Date(defaultFinishDate);
    const total = targetDate.getTime() - Date.now();
    const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
    const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
    const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0);
    const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);

    return { days, hours, minutes, seconds };
  }

  function formatTime(time: number): string {
    return time < 10 ? `0${time}` : time.toString();
  }

  return (
    <div className={styles.countdown}>
      <div className={styles.mainTitle}>
        {title}
      </div>
      <div className={styles.contentWrap}>
        <div className={styles.countItem}>
          <div className={styles.countNum}>{`${formatTime(remainingTime.days)}`}</div>
          <div className={styles.countTitle}>{t('countdown.days')}</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.countItem}>
          <div className={styles.countNum}>{`${formatTime(remainingTime.hours)}`}</div>
          <div className={styles.countTitle}>{t('countdown.hrs')}</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.countItem}>
          <div className={styles.countNum}>{`${formatTime(remainingTime.minutes)}`}</div>
          <div className={styles.countTitle}>{t('countdown.mins')}</div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.countItem}>
          <div className={styles.countNum}>{`${formatTime(remainingTime.seconds)}`}</div>
          <div className={styles.countTitle}>{t('countdown.secs')}</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;