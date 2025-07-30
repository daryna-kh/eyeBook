import { useEffect, useState } from 'react';
import { BookingItem, BookingResponse } from '../../api/book/types';
import { book } from '../../api/book/book';
import { TimeInterval } from '../../store/availableTimeSlice/types';
import { useDispatch, useSelector } from '../../store';
import { availableTimeSelector } from '../../store/availableTimeSlice/selectors';
import { screensSelector } from '../../store/screens/selectors';
import { useStepContent } from '../../components/StepContent/useStepContent';
import { useUserForm } from '../../components/UserForm/usePersonalDetailsForm';
import { setActiveScreen, setHistory, setPrevScreen } from '../../store/screens';

export const useBooking = () => {
  const [bookingData, setBookingData] = useState<BookingItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const { accessToken } = useSelector(screensSelector);
  const { intervals } = useSelector(availableTimeSelector);
  const { findItemInHistory, userData, doctorStoreVal, requestParams } = useStepContent();
  const { isOtherDoctorVisit } = useUserForm();

  const date = findItemInHistory('selectVisitTime')?.date as string;

  const findFreeProviderByInterval = () => {
    const [day, time] = date.split('_');
    for (const arr of intervals) {
      const intervalsForDay = arr.data[day];
      if (intervalsForDay) {
        const provider = requestParams.provider.find(key =>
          intervalsForDay[key]?.some((int: TimeInterval) => time >= int.from && time <= int.to),
        );
        if (provider) return provider;
      }
    }
    return '';
  };

  function handleEdit() {
    dispatch(setHistory([]));
    dispatch(setActiveScreen('serviceType'));
    dispatch(setPrevScreen(''));
  }

  useEffect(() => {
    const fetchBooking = async () => {
      setIsLoading(true);

      if (userData) {
        const provider =
          doctorStoreVal === 'availableDoctors'
            ? findFreeProviderByInterval()
            : requestParams.provider[0];

        try {
          const response = await book(
            accessToken,
            requestParams.service,
            requestParams.location,
            provider,
            date,
            userData,
            isOtherDoctorVisit,
          );
          setBookingData(response ? response.bookings : null);
        } catch (error) {
          console.error('Booking failed:', error);
          setBookingData(null);
        }
      }

      setIsLoading(false);
    };

    const timer = setTimeout(fetchBooking, 500);
    return () => clearTimeout(timer);
  }, []);

  return { bookingData, isLoading, handleEdit };
};
