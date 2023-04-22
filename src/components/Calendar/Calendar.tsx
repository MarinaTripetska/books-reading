import React, { useEffect } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { ReactComponent as CalendarIcon } from './assets/calendar.svg';
import { ReactComponent as InputArrow } from './assets/arrow.svg';
import styles from './Calendar.module.scss';
import moment from 'moment';
import 'moment/locale/en-gb';

interface CalendarProps {
  placeHolder: string;
  onlyAfter?: boolean;
  today?: boolean;
  open?: boolean;
  updateDate?: (date: string) => void;
  setDate?: React.Dispatch<React.SetStateAction<string>>;
}

function Calendar({
  placeHolder,
  onlyAfter,
  today,
  open,
  updateDate,
}: CalendarProps) {
  const CustomInput = ({
    value,
    onClick,
  }: {
    value: string;
    onClick: () => void;
  }) => (
    <div className={styles.regularInput} onClick={onClick}>
      <CalendarIcon style={{ minWidth: '17px', minHeight: '17px' }} />
      <input
        className={styles.hiddenInput}
        type="text"
        placeholder={placeHolder}
        value={value}
        readOnly
      />
      <InputArrow style={{ minWidth: '13px', minHeight: '10px' }} />
    </div>
  );

  const isAfter = (currentDate: moment.Moment): boolean => {
    return currentDate.isAfter(moment(), 'day');
  };

  useEffect(() => {
    if (today && updateDate) updateDate(new Date().toISOString());
  }, []);

  const handleDateChange = (date: string | moment.Moment): void => {
    if (typeof date !== 'string') {
      date = date.endOf('day').toISOString();
    }
    if (updateDate) {
      updateDate(moment(date).endOf('day').toISOString());
    }
  };

  return (
    <div>
      <Datetime
        renderInput={CustomInput}
        closeOnSelect={true}
        locale="en-gb"
        timeFormat={false}
        isValidDate={onlyAfter && !today ? isAfter : undefined}
        initialValue={today ? new Date() : undefined}
        open={open ? false : undefined}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default Calendar;
