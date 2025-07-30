import { Form } from './type';

export const forms: Form[] = [
  {
    id: 'insurances',
    title: 'Insurance Coverage',
    navigateTo: 'location',
    default: 'inNetwork',
    fields: [
      {
        id: 'inNetwork',
        name: 'In-Network Insurance Plans',
        infoTitle: "Can't find your insurance?",
        infoMessage:
          'This provider is not in-network for the selected plan (e.g., Aetna - Choice®POS II (Open Access)). You may have a higher out-of-pocket cost or need to pay in full for your visit.',
        options: [
          { id: 'aetna', name: 'Aetna' },
          { id: 'anthem-blue-cross-blue-shield', name: 'Anthem Blue Cross Blue Shield' },
          { id: 'cigna', name: 'Cigna' },
          { id: 'empire_plan_nyship', name: 'Empire Plan (NYSHIP)' },
          { id: 'emblem_health_ghi', name: 'Emblem Health (GHI)' },
          { id: 'emblem_health_hip', name: 'Emblem Health (HIP)' },
          { id: 'humana_medicare', name: 'Humana (Medicare)' },
          { id: 'humana_medicare_ppo', name: 'Humana (Medicare PPO)' },
          { id: 'humana_medicare_hmo', name: 'Humana (Medicare HMO)' },
          { id: 'magnacare_ppp', name: 'Magnacare (PPO)' },
          { id: 'medicare', name: 'Medicare' },
          { id: 'oxford', name: 'Oxford' },
          { id: 'united_health_care', name: 'United Health Care' },
        ],
        default: false,
        showInUserDataForm: true,
      },
      {
        id: 'outOfNetwork',
        name: 'Out-of-Network Insurance Plans',
        infoTitle: 'How Out-of-Network Coverage Works',
        infoMessage:
          'After your visit, we will bill your insurance provider. Depending on your plan, they may reimburse you directly for a portion of the cost.',
        options: [
          { id: 'aetna_vision', name: 'Aetna Vision' },
          { id: 'blue_view_vision', name: 'Blue View Vision' },
          { id: 'cigna_vision', name: 'Cigna Vision' },
          { id: 'davis_vision', name: 'Davis Vision' },
          { id: 'eyemed', name: 'Eyemed' },
          { id: 'spectera', name: 'Spectera' },
          { id: 'superior_vision', name: 'Superior Vision' },
          { id: 'vsp', name: 'VSP' },
        ],
        default: false,
        showInUserDataForm: false,
      },
      {
        id: 'other',
        name: 'Not Listed or Self-Pay',
        price: '$125',
        infoTitle: "Can't find your insurance?",
        infoMessage:
          'This provider is not in-network for the selected plan (e.g., Aetna - Choice®POS II (Open Access)). You may have a higher out-of-pocket cost or need to pay in full for your visit.',
        options: [{ id: 'not_listed', name: 'My insurance is not listed' }],
        default: true,
        showInUserDataForm: false,
      },
    ],
  },
  {
    id: 'user',
    navigateTo: 'finish',
    fields: [
      {
        name: 'Patient’s first and last name',
        id: 'userName',
        type: 'input',
        required: true,
        default: '',
      },
      {
        name: 'Email address',
        id: 'email',
        type: 'input',
        required: true,
        default: '',
      },
      {
        name: 'Phone number',
        id: 'phone',
        type: 'input',
        required: true,
        default: '',
      },
      {
        name: 'Insurance',
        id: 'insurance',
        type: 'input',
        required: false,
        default: '',
      },
      {
        name: 'Notes',
        id: 'note',
        type: 'textarea',
        required: false,
        default: '',
      },
    ],
  },
];
