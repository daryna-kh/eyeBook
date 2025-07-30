import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from '..';
import { computeWorkingDay } from '../../helpers/helpers';
import { setLoaded } from '../screens';
import { screensSelector } from '../screens/selectors';
import { fetchAvailableTimeIntervals } from './fetchAvailableTimeIntervals';
import { availableTimeSelector } from './selectors';

export const useFetchAvailableTimes = (requestParams: {
  service: string;
  location: string;
  provider: string[];
}) => {
  const { activeScreen, accessToken, currentDate } = useSelector(screensSelector);
  const { intervals } = useSelector(availableTimeSelector);
  const dispatch = useDispatch();
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  const loadFlag = useRef(false);

  const performerIds = ['2', '3', '4', '7', '8', '9'];

  const secondComputedFirstWorkingDay = useMemo(() => {
    return currentDate ? computeWorkingDay(currentDate, 30) : null;
  }, [currentDate]);

  const thirdComputedFirstWorkingDay = useMemo(() => {
    return currentDate ? computeWorkingDay(currentDate, 60) : null;
  }, [currentDate]);

  async function loadData() {
    const fetchParams = [];

    if (currentDate && secondComputedFirstWorkingDay) {
      fetchParams.push({
        token: accessToken,
        dateFrom: currentDate,
        lastWorkingDayinWeek: secondComputedFirstWorkingDay,
        serviceId: requestParams.service,
        performerId: performerIds,
      });
    }

    if (secondComputedFirstWorkingDay && thirdComputedFirstWorkingDay) {
      fetchParams.push({
        token: accessToken,
        dateFrom: secondComputedFirstWorkingDay,
        lastWorkingDayinWeek: thirdComputedFirstWorkingDay,
        serviceId: requestParams.service,
        performerId: performerIds,
      });
    }

    if (thirdComputedFirstWorkingDay) {
      fetchParams.push({
        token: accessToken,
        dateFrom: thirdComputedFirstWorkingDay,
        lastWorkingDayinWeek: computeWorkingDay(thirdComputedFirstWorkingDay, 15),
        serviceId: requestParams.service,
        performerId: performerIds,
      });
    }

    await Promise.all(fetchParams.map(param => dispatch(fetchAvailableTimeIntervals(param))));

    loadFlag.current = false;
    setFetchLoading(false);
    dispatch(setLoaded(true));
  }

  useEffect(() => {
    if (activeScreen === 'selectDoctor' && !loadFlag.current && intervals.length === 0) {
      loadFlag.current = true;
      setFetchLoading(true);
      dispatch(setLoaded(false));
      const timeoutId = setTimeout(() => {
        loadData();
      }, 250);
      return () => clearTimeout(timeoutId);
    }
  }, [
    activeScreen,
    intervals,
    dispatch,
    accessToken,
    currentDate,
    requestParams.service,
    secondComputedFirstWorkingDay,
    thirdComputedFirstWorkingDay,
  ]);

  return { intervals, fetchLoading };
};
