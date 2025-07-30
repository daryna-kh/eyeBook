import { Schedule, TimeInterval } from '../../store/availableTimeSlice/types';
import { TimeIntervalsResponse } from './types';

export function generateTimeIntervals(
  dateFrom: string,
  dateTo: string,
  serviceId: string,
  doctorId: string[],
): TimeIntervalsResponse {
  const result: Schedule = {};
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);

  function formatTime(hours: number, minutes = 0): string {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  }

  const standardSlots: TimeInterval[] = Array.from({ length: 8 }, (_, i) => {
    const hour = 10 + i;
    return {
      from: formatTime(hour),
      to: formatTime(hour, 45),
    };
  });

  for (
    let current = new Date(startDate);
    current <= endDate;
    current.setDate(current.getDate() + 1)
  ) {
    const dateStr = current.toISOString().slice(0, 10);
    result[dateStr] = {};

    for (const docId of doctorId) {
      result[dateStr][docId] = [...standardSlots];
    }
  }

  return {
    result,
    id: serviceId,
    jsonrpc: '2.0',
  };
}
