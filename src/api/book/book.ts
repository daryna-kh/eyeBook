import { customFormsField } from '../../mock/associationsList/associatioanList';
import { findAssociationsId } from '../../mock/associationsList/findAssociationsId';
import { apiClient } from '../../services/http';
import { HistoryItem } from '../../store/screens/types';
import { mockBookingResponse } from './book.mock';
import { BookingResponse } from './types';

export const book = async (
  token: string | null,
  serviceId: string,
  locationId: string,
  performerId: string,
  dateVisit: string,
  userData: { [key: string]: string },
  isOtherDoctorVisit: HistoryItem | null,
): Promise<BookingResponse | null> => {
  if (!token) return mockBookingResponse();

  try {
    const [day, time] = dateVisit.split('_');

    const { email, userName, phone, note, insurance } = userData;

    const clientData = {
      name: userName,
      email,
      phone,
      insurance,
      note,
    };

    const setOptionalParams = (): Record<string, string> => {
      const optionalParamsObj: Record<string, string> = {};
      let note_ = '';

      Object.keys(userData).forEach(key => {
        const backendKey = findAssociationsId(key, customFormsField);

        if (key === 'insurance') {
          note_ += `Insurance: ${userData[key] || 'None'}; `;
        } else if (key === 'note') {
          note_ += `Note: ${userData[key]}`;
          if (isOtherDoctorVisit) {
            optionalParamsObj['3e4299014d5f7181cfade32f1acf79fe'] = userData[key];
          }
          if (backendKey) {
            optionalParamsObj[backendKey] = note_;
          }
        } else if (backendKey) {
          optionalParamsObj[backendKey] = userData[key];
        }
      });

      optionalParamsObj.location_id = locationId;

      return optionalParamsObj;
    };

    return await apiClient(token).book(
      serviceId,
      performerId,
      day,
      time,
      clientData,
      setOptionalParams(),
      1,
    );
  } catch (error) {
    console.error('Booking error:', error);
    return null;
  }
};
