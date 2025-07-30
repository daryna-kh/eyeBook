import {
  CurrentProviderSlotsItem,
  CurrentProviderSlotsItemByMonth,
} from '../api/getStartTimeMatrix/types';

export const getDateByYearMonth = ({
  year,
  month,
  groupedDates,
}: {
  year: string;
  month: string;
  groupedDates: CurrentProviderSlotsItemByMonth[];
}) => {
  const index = groupedDates.findIndex(date => date.month === month && date.year === year);
  if (index === -1) return null;
  return {
    index,
    dates: groupedDates[index],
  };
};

export const groupByMonth = (dates: CurrentProviderSlotsItem | null) =>
  (dates &&
    Object.keys(dates).reduce((groupedDates, date) => {
      const times = dates[date];
      const [year, month] = date.split('-');
      const datesFromGroup = getDateByYearMonth({ year, month, groupedDates });
      let groupedDatesIndex = datesFromGroup?.index || 0;

      if (!datesFromGroup) {
        groupedDates.push({
          year,
          month,
          dates: {},
        });
        groupedDatesIndex = groupedDates.length - 1;
      }

      groupedDates[groupedDatesIndex].dates[date] = times;

      return groupedDates;
    }, [] as CurrentProviderSlotsItemByMonth[])) ||
  [];

export const getDataBetweenDates = (
  startDate: string,
  endDate: string,
  groopedByMonth: CurrentProviderSlotsItemByMonth[],
) => {
  const result = {} as CurrentProviderSlotsItem;

  groopedByMonth.forEach(monthData => {
    const dates = monthData.dates;
    Object.keys(dates).forEach(dateKey => {
      if (dateKey >= startDate && dateKey <= endDate) {
        result[dateKey] = dates[dateKey];
      }
    });
  });

  return result;
};
