export type StepContentId =
  | 'serviceType'
  | 'examType'
  | 'contactLensesOptions'
  | 'insuranceOptions'
  | 'location'
  | 'selectDoctor'
  | 'selectVisitTime'
  | 'personalInformation'
  | 'finish';

export type StepContent = {
  id: string;
  title?: string;
  description?: string;
  step: string;
  cards?: string[];
  forms?: string;
  scheduler?: boolean;
  component?: string;
  showBreadcrumb?: string;
  backButtonsAvailable: boolean;
};
