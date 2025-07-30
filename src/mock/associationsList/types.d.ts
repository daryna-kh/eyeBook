export type AssociationType = {
  BEField: string | null;
  FEField: string | null;
  performers?: {
    BEField: string;
    FEField: string;
  }[];
  services?: {
    BEField: string;
    FEField: string;
  }[];
};
