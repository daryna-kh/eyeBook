import { format, fromZonedTime, toZonedTime } from 'date-fns-tz';
import { BookingItem } from '../../api/book/types';
import { stores } from '../../mock/associationsList/associatioanList';
import { getCard } from '../../mock/cards/getCard';
import styles from './AddToCalendar.module.scss';

type Props = {
  bookingData: BookingItem[];
};

export const AddToCalendar = ({ bookingData }: Props) => {
  if (!bookingData?.length) return null;

  const data = bookingData[0];
  const store = stores.find(s => s.BEField === String(data.location_id));
  const provider =
    (store?.performers &&
      getCard(store.performers.find(pr => pr.BEField === data.unit_id)?.FEField || '')?.title) ||
    '';

  const service =
    (store?.services &&
      getCard(store.services.find(srv => srv.BEField === data.event_id)?.FEField || '')?.title) ||
    '';

  const convertToLocalDate = (dateInNY: string) => {
    const NYC_TZ = 'America/New_York';
    const clientTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcDate = fromZonedTime(dateInNY, NYC_TZ);
    const zonedDate = toZonedTime(utcDate, clientTZ);
    return format(zonedDate, "yyyyMMdd'T'HHmmss", { timeZone: clientTZ });
  };

  const date = convertToLocalDate(data.start_date_time);

  const href = [
    'https://calendar.google.com/calendar/render?action=TEMPLATE',
    `&text=${encodeURIComponent(service)}`,
    `&dates=${date}/${date}`,
    `&details=${encodeURIComponent(provider)}`,
    '&sf=true&output=xml',
  ].join('');

  return (
    <a href={href} target='_blank' rel='noopener noreferrer' className={styles.addToCalendar}>
      <svg className={styles.icon} viewBox='0 0 24 24'>
        <path d='M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z' />
      </svg>
    </a>
  );
};
