import { configureStore } from "@reduxjs/toolkit";
import {
  EqualityFn,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { screenReducer } from "./screens";
import { availableTimeReducer } from "./availableTimeSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: {
    screens: screenReducer,
    availableTime: availableTimeReducer,
  },
});

export type Store = typeof store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
type useSelectorT = <TState = RootState, Selected = unknown>(
  selector: (state: TState) => Selected,
  equalityFn?: EqualityFn<Selected> | undefined
) => Selected;
export const useDispatch = () => useAppDispatch<AppDispatch>();

export const useSelector: useSelectorT = useAppSelector;
