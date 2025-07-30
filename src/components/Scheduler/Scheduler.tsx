import { useCallback, useEffect, useState } from 'react';
import { Calendar } from '../Calendar/Calendar';
import { DateSwiper } from '../DateSwiper/DateSwiper';
import { FullCalendar } from '../FullCalendar/FullCalendar';
import styles from './Scheduler.module.scss';
import { useScheduler } from './useScheduler';
import { Slots } from '../Slots/Slots';
import { CustomSpin } from '../CustomSpin/CustomSpin';

export const Scheduler = () => {
  const {
    fetchFreeSlots,
    scheduleData,
    slots,
    setSlots,
    setDateTimePickerLoaded,
    setFirstWorkingDay,
    setLastWorkingDay,
    setActiveDay,
    activeDay,
    dateTimePickerLoaded,
  } = useScheduler();

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isWideScreen, setIsWideScreen] = useState<boolean>(window.innerWidth >= 767);

  const handleDatesChange = useCallback(({ first, last }: { first: string; last: string }) => {
    setFirstWorkingDay(first);
    setLastWorkingDay(last);
    setTimeout(() => {
      fetchFreeSlots(first, last);
      setDateTimePickerLoaded(false);
    }, 200);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 767);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.Scheduler}>
      {!dateTimePickerLoaded && <CustomSpin />}
      <div className={styles.inner}>
        <div className={styles.scrollContainer}>
          <div className={styles.scrollContent}>
            {isWideScreen ? (
              <Calendar
                dates={scheduleData || {}}
                setDay={day => {
                  if (scheduleData) {
                    setSlots(scheduleData[day]);
                  }
                  setActiveDay(day);
                }}
                activeDay={activeDay}
                onDatesChange={handleDatesChange}
              />
            ) : (
              <DateSwiper
                dates={scheduleData || {}}
                setDay={day => {
                  if (scheduleData) {
                    setSlots(scheduleData[day]);
                  }
                  setActiveDay(day);
                }}
                activeDay={activeDay}
                onShowMore={() => setIsPopupOpen(true)}
                onDatesChange={handleDatesChange}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.slotsContent}>
        {scheduleData && <Slots selected={activeDay} slots={slots} />}
      </div>
      <FullCalendar
        onDone={(start, end) => {
          handleDatesChange({ first: start, last: end });
          setIsPopupOpen(false);
        }}
        open={isPopupOpen}
        onClose={state => setIsPopupOpen(state)}
      />
    </div>
  );
};
