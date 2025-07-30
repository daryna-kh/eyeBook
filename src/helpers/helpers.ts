import { OptionCardPrice } from '../mock/cards/type';
import { HistoryItem } from '../store/screens/types';

export function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function convertingDate(day: string) {
  const date = new Date(day);
  const day_ = date.getUTCDate();
  const dayWithSuffix = `${day_}${getOrdinalSuffix(day_)}`;

  const weekday = date.toLocaleString('en-US', { weekday: 'short' });
  const month = date.toLocaleString('en-US', { month: 'short' });

  return { weekday, month, dayWithSuffix };
}

export function formatTime(timeStr: string) {
  let [hours, minutes] = timeStr.split(':').map(Number);
  let period = hours < 12 ? 'am' : 'pm';

  hours = hours % 12 || 12;

  return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export const computeWorkingDay = (day: string | null, param: number) => {
  if (day === null) return null;
  const date = new Date(day);
  date.setDate(date.getDate() + param);
  return date.toISOString().split('T')[0];
};

export function getCurrentDateFormatted() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const formatDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(
    2,
    '0',
  )}`;

export function getPriceFromMockData(value: string | OptionCardPrice[], history: HistoryItem[]) {
  if (typeof value === 'string') {
    return value;
  } else {
    const price_ = value.filter(val => {
      return history.some(item => item.optionCard === val.fromPanel);
    });
    return price_[0].value;
  }
}

export function modifyDescription(param?: string, panelID?: string, activeScreen?: string) {
  let modifyedDescription: string = '';
  if (activeScreen === 'location') {
    if (panelID) return (modifyedDescription = `<p>${param}</p>`);
  } else if (activeScreen === 'selectDoctor') {
    return (modifyedDescription = `<p><span class="m-bottom">${param}</span></p>`);
  }
  return modifyedDescription;
}
