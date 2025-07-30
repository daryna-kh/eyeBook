import { createAsyncThunk } from '@reduxjs/toolkit';
import { Schedule } from './types';
import { getAvailableTimeIntervals } from '../../api/getAvailableTimeIntervals/getAvailableTimeIntervals';

export type FetchParams = {
  token: string | null;
  dateFrom: string | null;
  lastWorkingDayinWeek: string | null;
  serviceId: string;
  performerId: string[];
};
export const fetchAvailableTimeIntervals = createAsyncThunk<Schedule, FetchParams>(
  'availableTime/fetchIntervals',
  async (fetchParams, thunkAPI) => {
    const { token, dateFrom, lastWorkingDayinWeek, serviceId, performerId } = fetchParams;

    // if (!token) {
    //   return thunkAPI.rejectWithValue(null);
    // }

    try {
      const response = await getAvailableTimeIntervals(
        token,
        dateFrom,
        lastWorkingDayinWeek,
        serviceId,
        performerId,
      );

      if (response === null) {
        return thunkAPI.rejectWithValue(null);
      }

      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);
