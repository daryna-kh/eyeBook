import { BookingResponse } from './types';

function generateId() {
  return Math.floor(Math.random() * 1000000).toString();
}

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generateHash() {
  return Math.random().toString(36).substring(2, 12);
}

export function mockBookingResponse(): BookingResponse | null {
  const isSuccess = Math.random() < 0.5;

  if (!isSuccess) {
    return null;
  }

  const now = new Date();
  const start = new Date(now.getTime() + 15 * 60 * 1000);
  const end = new Date(start.getTime() + 45 * 60 * 1000);

  const formatDate = (d: Date) => d.toISOString().slice(0, 19).replace('T', ' ');

  const bookingItem = {
    id: generateId(),
    event_id: '1',
    unit_id: '2',
    location_id: '3',
    client_id: generateId(),
    start_date_time: formatDate(start),
    end_date_time: formatDate(end),
    is_confirmed: 'yes',
    code: generateCode(),
    hash: generateHash(),
  };

  const response = {
    require_confirm: false,
    bookings: [bookingItem],
    batch_type: 'single',
    recurrent_batch_id: '',
    batch_hash: generateHash(),
  };

  return response;
}
