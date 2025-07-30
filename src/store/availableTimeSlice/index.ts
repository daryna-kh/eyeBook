import { createSlice } from '@reduxjs/toolkit';
import { initialStateItem } from './types';
import { fetchAvailableTimeIntervals } from './fetchAvailableTimeIntervals';

const initialState: initialStateItem = {
  intervals: [],
  loading: false,
  error: null,
};

const availableTimeSlice = createSlice({
  name: 'availableTime',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAvailableTimeIntervals.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAvailableTimeIntervals.fulfilled, (state, action) => {
        const args = action.meta.arg;
        state.intervals.push({ data: action.payload, fetchParams: args });
        state.loading = false;
      })
      .addCase(fetchAvailableTimeIntervals.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const availableTimeReducer = availableTimeSlice.reducer;
