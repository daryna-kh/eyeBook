import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { historyState, HistoryItem } from './types';

const initialState: historyState = {
  accessToken: null,
  loaded: true,
  currentDate: '',
  activeScreen: 'serviceType',
  history: [],
  prevScreen: '',
  price: '',
};

export const screenSlice = createSlice({
  initialState,
  name: 'screen',
  reducers: {
    setLoaded(state, { payload }: PayloadAction<boolean>) {
      state.loaded = payload;
    },
    setAccessToken(state, { payload }: PayloadAction<string | null>) {
      state.accessToken = payload;
    },
    setCurrentDate(state, { payload }: PayloadAction<string>) {
      state.currentDate = payload;
    },
    setActiveScreen(state, { payload }: PayloadAction<string>) {
      state.activeScreen = payload;
    },
    setHistory(state, { payload }: PayloadAction<null | HistoryItem[]>) {
      if (payload) {
        state.history = payload;
      }
    },
    setPrevScreen(state, { payload }: PayloadAction<string>) {
      state.prevScreen = payload ? payload : '';
    },
    setPrice(state, { payload }: PayloadAction<string>) {
      state.price = payload ? payload : '';
    },
  },
});

export const {
  setActiveScreen,
  setLoaded,
  setCurrentDate,
  setHistory,
  setPrevScreen,
  setPrice,
  setAccessToken,
} = screenSlice.actions;

export const screenReducer = screenSlice.reducer;
