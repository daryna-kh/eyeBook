import { useEffect, useState } from 'react';
import { months, shortDays } from '../../share/constants';
import styles from './Calendar.module.scss';
import { Arrow } from '../../share/icons/Arrow';
import { formatDate } from '../../helpers/helpers';
import { CurrentProviderSlotsItem } from '../../api/getStartTimeMatrix/types';

type CalendarProps = {
  dates: CurrentProviderSlotsItem;
  setDay: (day: string) => void;
  activeDay: string | null;
  onDatesChange?: (dates: { first: string; last: string }) => void;
};

export const Calendar = ({ dates, setDay, activeDay, onDatesChange }: CalendarProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const [displayedMonth, setDisplayedMonth] = useState<number>(currentMonth);
  const [displayedYear, setDisplayedYear] = useState<number>(currentYear);

  const firstOfMonth = new Date(displayedYear, displayedMonth, 1);
  const startDayIndex = firstOfMonth.getDay();
  const gridStart = new Date(displayedYear, displayedMonth, 1 - startDayIndex);

  const limitDate = new Date();
  limitDate.setHours(0, 0, 0, 0);
  limitDate.setMonth(limitDate.getMonth() + 3);

  const disabledPrevBtn =
    displayedYear === today.getFullYear() && displayedMonth === today.getMonth();
  const disabledNextBtn =
    displayedYear === limitDate.getFullYear() && displayedMonth === limitDate.getMonth();

  useEffect(() => {
    const firstDayOfMonth = new Date(displayedYear, displayedMonth, 1);
    const lastDayOfMonth = new Date(displayedYear, displayedMonth + 1, 0);
    const computedFirstDate = firstDayOfMonth < today ? today : firstDayOfMonth;
    const computedLastDate = lastDayOfMonth > limitDate ? limitDate : lastDayOfMonth;
    const firstDayFormatted = formatDate(computedFirstDate);
    const lastDayFormatted = formatDate(computedLastDate);
    if (onDatesChange) {
      onDatesChange({
        first: firstDayFormatted,
        last: lastDayFormatted,
      });
    }
  }, [displayedYear, displayedMonth]);

  useEffect(() => {
    const activeDate = activeDay ? new Date(activeDay) : null;
    const isActiveInDisplayedMonth =
      activeDate &&
      activeDate.getFullYear() === displayedYear &&
      activeDate.getMonth() === displayedMonth;

    if (isActiveInDisplayedMonth) return;

    const keys = Object.keys(dates);
    const monthKeys = keys.filter(key => {
      const dateObj = new Date(key);
      return dateObj.getFullYear() === displayedYear && dateObj.getMonth() === displayedMonth;
    });
    const firstAvailableDay = monthKeys.find(key => dates[key].length > 0);
    if (firstAvailableDay) {
      setDay(firstAvailableDay);
    }
  }, [dates, displayedMonth, displayedYear, activeDay, setDay]);

  const handlePrev = () => {
    if (displayedYear === today.getFullYear() && displayedMonth === today.getMonth()) {
      return;
    }
    let newMonth = displayedMonth - 1;
    let newYear = displayedYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear = displayedYear - 1;
    }
    if (
      newYear < today.getFullYear() ||
      (newYear === today.getFullYear() && newMonth < today.getMonth())
    ) {
      return;
    }
    setDisplayedMonth(newMonth);
    setDisplayedYear(newYear);
  };

  const handleNext = () => {
    if (displayedYear === limitDate.getFullYear() && displayedMonth === limitDate.getMonth()) {
      return;
    }
    let newMonth = displayedMonth + 1;
    let newYear = displayedYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear = displayedYear + 1;
    }
    if (
      newYear > limitDate.getFullYear() ||
      (newYear === limitDate.getFullYear() && newMonth > limitDate.getMonth())
    ) {
      return;
    }
    setDisplayedMonth(newMonth);
    setDisplayedYear(newYear);
  };

  const renderDays = () => {
    const cells: React.ReactElement[] = [];
    for (let i = 0; i < 42; i++) {
      const cellDate = new Date(gridStart);

      cellDate.setDate(gridStart.getDate() + i);
      const cellDateNormalized = new Date(cellDate);
      cellDateNormalized.setHours(0, 0, 0, 0);

      const todayDate = new Date(today);
      todayDate.setHours(0, 0, 0, 0);

      const formattedDay = formatDate(cellDateNormalized);
      const todayFormatted = formatDate(todayDate);
      const dateEntry = dates[formattedDay];
      const pastDays = cellDateNormalized < todayDate;
      const disabled =
        cellDateNormalized < todayDate ||
        cellDateNormalized > limitDate ||
        !dateEntry ||
        (dateEntry && dateEntry.length === 0);

      cells.push(
        <span
          className={`${formattedDay} ${styles.dayCell} ${
            activeDay === formattedDay ? styles.activeCell : ''
          } ${disabled ? styles.disabledDay : ''} ${pastDays ? styles.pastDays : ''} ${todayFormatted === formattedDay ? styles.today : ''}`}
          key={formattedDay}
          onClick={() => {
            if (!disabled) {
              setDay(formattedDay);
            }
          }}
        >
          {cellDate.getDate()}
        </span>,
      );
    }
    return <div className={styles.daysGrid}>{cells}</div>;
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.navigation}>
        <button
          className={`${styles.navigationBtn} ${disabledPrevBtn ? styles.disabled : ''}`}
          onClick={handlePrev}
        >
          <Arrow />
        </button>
        <h2 className={styles.Title}>{`${months[displayedMonth]} ${displayedYear}`}</h2>
        <button
          className={`${styles.navigationBtn} ${disabledNextBtn ? styles.disabled : ''}`}
          onClick={handleNext}
        >
          <Arrow deg={180} />
        </button>
      </div>
      <div>
        <div className={styles.dayNames}>
          {shortDays.map((d, idx) => (
            <span
              className={`${styles.dayName} ${(idx === 0 || idx === 6) && styles.weekEnd}`}
              key={`line-1-${d}-${idx}`}
            >
              {d}
            </span>
          ))}
          {shortDays.map((d, idx) => (
            <span
              className={`${styles.dayName} ${(idx === 0 || idx === 6) && styles.weekEnd}`}
              key={`line-2-${d}-${idx}`}
            >
              {d}
            </span>
          ))}
        </div>
        {renderDays()}
      </div>
    </div>
  );
};
