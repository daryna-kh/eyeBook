type StartTimeMatrixResponse = {
  result: {
    [date: string]: string[];
  };
  id: string;
  jsonrpc: '2.0';
};

export function mockGetStartTimeMatrix(
  from: string,
  to: string,
  eventId: string,
  unitId: string[] | string,
  count: number,
): StartTimeMatrixResponse {
  const result: Record<string, string[]> = {};

  const startDate = new Date(from);
  const endDate = new Date(to);

  const baseTimes = [
    '10:00:00',
    '11:00:00',
    '12:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
  ];

  while (startDate <= endDate) {
    const dateStr = startDate.toISOString().slice(0, 10);

    const isOffDay = Math.random() < 0.2;

    result[dateStr] = isOffDay ? [] : [...baseTimes];

    startDate.setDate(startDate.getDate() + 1);
  }

  return {
    result,
    id: eventId,
    jsonrpc: '2.0',
  };
}
