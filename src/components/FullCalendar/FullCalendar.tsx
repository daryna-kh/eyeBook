import React, { useState } from 'react';
import styles from './FullCalendar.module.scss';
import { months, shortDays } from '../../share/constants';
import { Close } from '../../share/icons/Close';

interface Props {
  onDone: (start: string, end: string) => void;
  open: boolean;
  onClose: (state: boolean) => void;
}

export const FullCalendar: React.FC<Props> = ({ onDone, open, onClose }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 3);

  const formatDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(
      2,
      '0',
    )}`;

  const [days, setDays] = useState<{ startDate: null | string; finalDate: null | string }>({
    startDate: null,
    finalDate: null,
  });

  const handleDateClick = (date: Date) => {
    if (date < today || date > maxDate) return;

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 13);
    const finalEnd = end > maxDate ? maxDate : end;
    setDays({ startDate: formatDate(start), finalDate: formatDate(finalEnd) });
  };

  const renderDays = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const cells: React.ReactElement[] = [];

    for (let i = 0; i < startDay; i++) {
      cells.push(<span className={styles.empty} key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      dateObj.setHours(0, 0, 0, 0);
      const disabled = dateObj < today || dateObj > maxDate;
      cells.push(
        <span
          className={`${styles.day} ${disabled ? styles.disabled : ''} 
          ${days.startDate === formatDate(dateObj) ? styles.selected : ''} 
          ${formatDate(today) === formatDate(dateObj) ? styles.today : ''}`}
          key={`${year}-${month}-${day}`}
          onClick={() => !disabled && handleDateClick(dateObj)}
          style={{
            cursor: disabled ? 'default' : 'pointer',
            opacity: disabled ? 0.4 : 1,
            pointerEvents: disabled ? 'none' : 'auto',
          }}
        >
          {day}
        </span>,
      );
    }
    return <div className={styles.monthGrid}>{cells}</div>;
  };

  const renderMonths = () =>
    [0, 1, 2, 3].map(i => {
      const month = (currentMonth + i) % 12;
      const year = currentYear + Math.floor((currentMonth + i) / 12);
      return (
        <div className={styles.monthWrap} key={`${year}-${month}`}>
          <p className={styles.monthTitle}>
            {months[month]} {year}
          </p>
          <div className={styles.gridInner}>
            <div className={styles.dayNames}>
              {shortDays.map(d => (
                <span className={styles.dayName} key={d}>
                  {d}
                </span>
              ))}
            </div>
            {renderDays(year, month)}
          </div>
        </div>
      );
    });

  return (
    <div className={`${styles.popup} ${open ? styles.showPopup : styles.hidePopup}`}>
      <div
        className={`${styles.popupWrap} ${open ? styles.showPopupWrap : styles.hidePopupWrap}`}
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        <div className={styles.picker}>
          <div className={styles.wrap}>
            <button className={styles.close} onClick={() => onClose(false)}>
              <Close />
            </button>
            <h5 className={styles.title}>Select a date</h5>
            <div className={styles.calendar}>{renderMonths()}</div>
          </div>
          <div className={styles.btnInner}>
            <div className={styles.shadow}></div>
            <div className={styles.btnInner}>
              <button
                className={styles.submit}
                disabled={!days.startDate || !days.finalDate}
                onClick={() => onDone(days.startDate!, days.finalDate!)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
