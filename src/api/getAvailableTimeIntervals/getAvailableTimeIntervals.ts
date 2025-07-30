import { apiClient } from '../../services/http';
import { Schedule } from '../../store/availableTimeSlice/types';
import { generateTimeIntervals } from './getAvailableTimeIntervals.mock';

export const getAvailableTimeIntervals = async (
  token: string | null,
  dateFrom: string | null,
  lastWorkingDayinWeek: string | null,
  serviceId: string,
  performerId: string[],
): Promise<Schedule | null> => {
  if (!dateFrom || !lastWorkingDayinWeek) return null;

  if (token) {
    try {
      return await apiClient(token).getAvailableTimeIntervals(
        dateFrom,
        lastWorkingDayinWeek,
        serviceId,
        performerId,
        1,
      );
    } catch (error) {
      console.error('Error fetching essential data:', error);
      return null;
    }
  } else {
    const data = generateTimeIntervals(dateFrom, lastWorkingDayinWeek, serviceId, performerId);
    return data.result;
  }
};
