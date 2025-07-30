import { apiClient } from '../../services/http';
import { mockGetStartTimeMatrix } from './generateTimeMatrix';

export const getStartTimeMatrix = async (
  token: string | null,
  dateFrom: string | null,
  lastWorkingDayinWeek: string | null,
  serviceId: string,
  performerId: string[],
  locationId: string,
): Promise<Record<string, string[]> | null> => {
  if (!dateFrom || !lastWorkingDayinWeek) return null;

  if (token) {
    try {
      return await apiClient(token).getStartTimeMatrix(
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
    const data = mockGetStartTimeMatrix(dateFrom, lastWorkingDayinWeek, serviceId, performerId, 1);
    return data.result;
  }
};
