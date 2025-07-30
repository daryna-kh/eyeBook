import { useEffect, useState } from 'react';
import { getStartTimeMatrix } from '../../api/getStartTimeMatrix/getStartTimeMatrix';
import { useSelector } from '../../store';
import { setLoaded } from '../../store/screens';
import { screensSelector } from '../../store/screens/selectors';
import { useStepContent } from '../StepContent/useStepContent';

export const useScheduler = () => {
  const { accessToken, currentDate, activeScreen } = useSelector(screensSelector);
  const { requestParams } = useStepContent();

  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [firstWorkingDay, setFirstWorkingDay] = useState<string>(currentDate);
  const [lastWorkingDay, setLastWorkingDay] = useState<string | null>(null);

  const [slots, setSlots] = useState<string[]>([]);
  const [scheduleData, setScheduleData] = useState<Record<string, string[]> | null>(null);

  const [date, setDate] = useState<{ day: string; time: string }>({
    day: '',
    time: '',
  });

  const setDay = (newDay: string) => {
    setDate(prev => ({ ...prev, day: newDay }));
  };

  const setTime = (newTime: string) => {
    setDate(prev => ({ ...prev, time: newTime }));
  };

  const [dateTimePickerLoaded, setDateTimePickerLoaded] = useState<boolean>(false);

  const fetchFreeSlots = async (
    computedFirstWorkingDay: string,
    computedLastWorkingDay: string,
  ) => {
    // setScheduleData(startTimeMatrix);
    setDateTimePickerLoaded(true);

    try {
      const dates = await getStartTimeMatrix(
        accessToken,
        computedFirstWorkingDay,
        computedLastWorkingDay,
        requestParams.service,
        requestParams.provider,
        requestParams.location,
      );
      setScheduleData(dates);
    } catch (error) {
      console.error(error);
    }
    setDateTimePickerLoaded(true);
  };

  useEffect(() => {
    setDateTimePickerLoaded(true);
    const timer = setTimeout(() => {
      if (!scheduleData) return;

      const firstAvailableDayKey = Object.keys(scheduleData).find(
        key => scheduleData[key].length > 0,
      );

      if (firstAvailableDayKey) {
        setSlots(scheduleData[firstAvailableDayKey]);
        setActiveDay(firstAvailableDayKey);
        setDay(firstAvailableDayKey);
      }

      if (lastWorkingDay) {
        setFirstWorkingDay(lastWorkingDay);
      }

      setDateTimePickerLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [scheduleData, lastWorkingDay]);

  return {
    currentDate,
    fetchFreeSlots,
    scheduleData,
    slots,
    activeDay,
    setDay,
    setTime,
    date,
    setLoaded,
    dateTimePickerLoaded,
    setDateTimePickerLoaded,
    firstWorkingDay,
    lastWorkingDay,
    setLastWorkingDay,
    setSlots,
    activeScreen,
    setActiveDay,
    setFirstWorkingDay,
    setScheduleData,
  };
};
