import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect } from 'react';
import styles from './DateSwiper.module.scss';
import { convertingDate, formatDate } from '../../helpers/helpers';
import { CurrentProviderSlotsItem } from '../../api/getStartTimeMatrix/types';

// const SwiperButtonPrev = () => {
//   const swiper = useSwiper();
//   return (
//     <button
//       onClick={() => swiper.slidePrev()}
//       className={`${styles.navButton} ${styles.navButton_prev} navBtn`}
//     >
//       <ArrowLeft deg={0} />
//     </button>
//   );
// };

// const SwiperButtonNext = () => {
//   const swiper = useSwiper();
//   return (
//     <button
//       onClick={() => swiper.slideNext()}
//       className={`${styles.navButton} ${styles.navButton_next} navBtn`}
//     >
//       <ArrowLeft deg={180} />
//     </button>
//   );
// };

function convertingDateForDatePicker(date: string) {
  const dateParts = convertingDate(date);
  return (
    <>
      <p className={styles.weekday}>{dateParts.weekday}</p>
      <p>
        {dateParts.month} {dateParts.dayWithSuffix}
      </p>
    </>
  );
}

interface DateSwiper {
  dates: CurrentProviderSlotsItem;
  setDay: (day: string) => void;
  activeDay: string | null;
  onDatesChange?: (dates: { first: string; last: string }) => void;
  onShowMore?: () => void;
}

export const DateSwiper = ({ dates, setDay, activeDay, onDatesChange, onShowMore }: DateSwiper) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const globalLimit = new Date(today);
  globalLimit.setMonth(globalLimit.getMonth() + 5);

  let candidate: Date | null = null;
  const temp = new Date(Object.keys(dates)[0] || today);
  for (let i = 0; i < 14; i++) {
    const formatted = formatDate(temp);
    const isAvailable = dates[formatted] && dates[formatted].length > 0;
    const beyondLimit = temp > globalLimit;
    if (isAvailable && !beyondLimit) {
      candidate = new Date(temp);
      break;
    }
    temp.setDate(temp.getDate() + 1);
  }
  const initial = candidate ? candidate : today;

  const start = new Date(initial);
  const end = new Date(initial);
  end.setDate(end.getDate() + 13);

  const displayedDates: { date: Date; formatted: string; disabled: boolean }[] = [];
  const tempDate = new Date(start);
  while (tempDate <= end) {
    const copy = new Date(tempDate);
    const formatted = formatDate(copy);
    const available = dates[formatted] && dates[formatted].length > 0;
    const beyondLimit = copy > globalLimit;
    displayedDates.push({
      date: copy,
      formatted,
      disabled: !available || beyondLimit,
    });
    tempDate.setDate(tempDate.getDate() + 1);
  }

  let defaultGlobalIndex = displayedDates.findIndex(item => !item.disabled);
  if (defaultGlobalIndex < 0) {
    defaultGlobalIndex = 0;
  }

  const periodData = {
    today,
    globalLimit,
    initialStartDate: initial,
    periodRange: { start, end },
    displayedDates,
    defaultGlobalIndex,
  };

  useEffect(() => {
    if (periodData.displayedDates.length) {
      const initialDay = periodData.displayedDates[periodData.defaultGlobalIndex].formatted;
      if (activeDay !== initialDay) {
        setDay(initialDay);
        if (onDatesChange) {
          onDatesChange({
            first: formatDate(periodData.periodRange.start),
            last: formatDate(periodData.periodRange.end),
          });
        }
      }
    }
  }, []);

  const handleDayClick = (dayKey: string, isDisabled: boolean) => {
    if (isDisabled) return;
    setDay(dayKey);
  };

  const handleShowMoreClick = () => {
    if (onShowMore) {
      onShowMore();
    }
  };

  return (
    <Swiper
      spaceBetween={12}
      initialSlide={periodData.defaultGlobalIndex}
      slidesPerView='auto'
      className={styles.Swiper}
    >
      {/* <SwiperButtonPrev /> */}
      {periodData.displayedDates.map((item, index) => (
        <SwiperSlide className={styles.daySlotWrapper} key={`day-${item.formatted}-${index}`}>
          <button
            className={`${item.disabled ? styles.disabled : ''} ${styles.dayButton} ${
              activeDay === item.formatted ? styles.active : ''
            }`}
            onClick={() => handleDayClick(item.formatted, item.disabled)}
            disabled={item.disabled}
          >
            {convertingDateForDatePicker(item.formatted)}
          </button>
        </SwiperSlide>
      ))}
      {periodData.periodRange.end < periodData.globalLimit && (
        <SwiperSlide className={`${styles.showMore} ${styles.daySlotWrapper}`} key='show-more'>
          <button onClick={handleShowMoreClick}>Show More Dates</button>
        </SwiperSlide>
      )}
      {/* <SwiperButtonNext /> */}
    </Swiper>
  );
};
