export interface BookingItem {
  id: string;
  event_id: string;
  unit_id: string;
  location_id?: string;
  client_id: string;
  start_date_time: string;
  end_date_time: string;
  is_confirmed: string;
  code: string;
  hash: string;
}

export interface BookingResponse {
  require_confirm: boolean;
  bookings: BookingItem[];
  batch_type: string;
  recurrent_batch_id: string;
  batch_hash: string;
}
