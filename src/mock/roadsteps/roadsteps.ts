import { RoadStepItem } from './types';

export const roadsteps: RoadStepItem[] = [
  {
    id: 'visitPurpose',
    name: 'Service',
    screens: ['serviceType'],
  },
  {
    id: 'examTypeStep',
    name: 'Exam',
    screens: ['examType', 'contactLensesOptions'],
  },
  {
    id: 'yourPlan',
    name: 'Options',
    screens: ['insuranceOptions'],
  },
  {
    id: 'location',
    name: 'Location',
    screens: ['location'],
  },
  {
    id: 'doctor',
    name: 'Doctor',
    screens: ['selectDoctor'],
  },
  {
    id: 'dateTime',
    name: 'Date & Time',
    screens: ['selectVisitTime'],
  },
  {
    id: 'personalInfo',
    name: 'Info',
    screens: ['personalInformation'],
  },
  {
    id: 'finish',
    name: 'Finish',
    screens: ['finish'],
    disabled: true,
  },
];
