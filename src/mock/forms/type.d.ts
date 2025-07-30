export type InsuranceType = {
  id: string;
  name: string;
  price?: string;
  infoTitle: string;
  infoMessage: string;
  options: { id: string; name: string }[];
  default: boolean;
  showInUserDataForm: boolean;
};

export type UserType = {
  name: string;
  id: string;
  type: string;
  required: boolean;
  options?: { id: string; name: string }[];
  dependent?: boolean;
  default: string;
};
export type Form = {
  id: string;
  title?: string;
  default?: string;
  navigateTo: string;
  fields: UserType[] | InsuranceType[];
};
