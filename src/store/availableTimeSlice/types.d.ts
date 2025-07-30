export type TimeInterval = {
  from: string;
  to: string;
};

export type DailySchedule = {
  [key: string]: TimeInterval[];
};

export type Schedule = {
  [key: string]: DailySchedule;
};

export type ScheduleContainer = {
  data: Schedule;
  fetchParams: fetchParams;
};

export type initialStateItem = {
  intervals: ScheduleContainer[];
  loading: boolean;
  error: null;
};
