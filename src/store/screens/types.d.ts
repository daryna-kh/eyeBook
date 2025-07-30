export type HistoryItem = {
  screen: string;
  optionCard?: string;
  date?: string;
  personalDetails: null | { [key in string]: string };
};
export type historyState = {
  accessToken: string | null;
  loaded: boolean;
  currentDate: string;
  activeScreen: StepContentId;
  history: HistoryItem[];
  prevScreen: string;
  price: string;
};
