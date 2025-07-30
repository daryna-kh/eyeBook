export type OptionCardPrice = {
  fromPanel: string;
  value: string;
};

export type OptionCardType = {
  id: string;
  title: string;
  img: boolean;
  badge?: string;
  description?: string;
  skipSteps?: string[];
  infoMessage?: string;
  disabledFor?: string[];
  price?: string | OptionCardPrice[];
  meta?: string;
  marker?: boolean;
  hasSubOption?: boolean;
  singleProvider?: string[];
  navigateTo: string;
};
