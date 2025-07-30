export type CurrentProviderSlotsItem = {
  [key: string]: string[];
};

export type CurrentProviderSlotsItemByMonth = {
  year: string;
  month: string;
  dates: CurrentProviderSlotsItem;
};
