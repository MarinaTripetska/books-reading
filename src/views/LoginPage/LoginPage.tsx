import React, { useState, useEffect } from 'react';
import LoginForm from '../../components/LoginForm';
import styles from './LoginPage.module.scss';
import getRandomNum from '../../utils/getRandomNum';
import { useTranslation } from 'react-i18next';

export interface QuoteI {
  text: string;
  author: string;
}

export default function LoginPage() {
  const { t } = useTranslation();
  const [quoteIndex, setQuoteIndex] = useState(getRandomNum(0, 11));

  const prevIndex = (quoteIndex + 11) % 12;
  const activeQuoteClass = quoteIndex === 0 ? styles.activeQuote : '';

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = getRandomNum(0, 11);
      setQuoteIndex(newIndex);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [quoteIndex]);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.leftSide}>
        <LoginForm />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.quoteSign}>&ldquo;</div>
        <p
          key={`text-${quoteIndex}-${prevIndex}`}
          className={`${styles.quoteText} ${
            quoteIndex > prevIndex ? styles.fadeIn : styles.fadeOut
          } ${activeQuoteClass}`}
        >
          {t(`quotes.${quoteIndex}.text`)}
        </p>
        <p
          key={`author-${quoteIndex}-${prevIndex}`}
          className={`${styles.quoteAuthor} ${
            quoteIndex > prevIndex ? styles.fadeIn : styles.fadeOut
          } ${activeQuoteClass}`}
        >
          {t(`quotes.${quoteIndex}.author`)}
        </p>
      </div>
    </div>
  );
}
