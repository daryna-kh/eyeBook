import { OptionCardType } from './type';

export const cards: OptionCardType[] = [
  {
    id: 'routineEyeExam',
    title: 'Routine Eye Exam',
    badge: '30 min',
    meta: 'Cost Varies',
    img: true,
    description:
      'Exam to get a glasses or contacts prescription and/or assess your overall eye health.',
    hasSubOption: true,
    infoMessage:
      '<ul><li>Full Eye Health Examination</li><li>New Glasses Prescription</li><li>Refraction for Glasses</li><li>Visual field test</li><li>Visual refraction eye test</li><li>Consulting with an optometrist</li></ul>',
    navigateTo: 'examType',
  },
  {
    id: 'contactLens',
    title: 'Contact Lens Exam',
    badge: '45 min',
    meta: 'Cost Varies',
    img: true,
    description:
      'Professional fitting of contact lenses with a trial session. Includes training on proper use and lens care.',
    hasSubOption: true,
    skipSteps: ['yourPlan'],
    navigateTo: 'contactLensesOptions',
  },
  {
    id: 'dmvVisionTest',
    title: 'DMV Vision Tests',
    badge: '1h',
    meta: 'Cost Varies',
    img: true,
    description:
      'Vision screening for obtaining or renewing a driver’s license. Performed according to New York State DMV requirements.',
    skipSteps: ['examTypeStep', 'yourPlan', 'doctor'],
    singleProvider: ['drEmilyCarter'],
    navigateTo: 'location',
  },
  {
    id: 'otherDoctorVisits',
    title: 'All Other Doctor Visits',
    badge: '30 min',
    meta: 'Cost Varies',
    img: false,
    description:
      'Consultations for all other eye care needs. Suitable for diagnosis, treatment, and individual recommendations.',
    skipSteps: ['examTypeStep'],
    navigateTo: 'insuranceOptions',
  },
  {
    id: 'completeEyeExam',
    title: 'Complete Eye Examination',
    badge: '30 min',
    img: false,
    description: 'Full eye health checkup with an updated glasses prescription.',
    infoMessage:
      '<ul><li>Comprehensive eye health exam</li><li>Updated glasses prescription</li><li>Vision refraction for glasses</li><li>Visual field testing</li><li>Detailed vision evaluation</li><li>Consultation with an optometrist</li></ul>',
    navigateTo: 'insuranceOptions',
  },
  {
    id: 'childEyeExam',
    title: 'Children’s Eye Exam (Ages 8+)',
    img: false,
    description: 'Thorough pediatric eye check and updated glasses prescription.',
    infoMessage:
      '<ul><li>Comprehensive eye health exam</li><li>Updated glasses prescription</li><li>Vision refraction for glasses</li><li>Visual field testing</li><li>Detailed vision evaluation</li><li>Consultation with an optometrist</li></ul>',
    navigateTo: 'insuranceOptions',
  },
  {
    id: 'payingMyself',
    title: 'Self-Pay Options',
    img: false,
    price: [
      {
        fromPanel: 'completeEyeExam',
        value: '$125',
      },
      {
        fromPanel: 'pediatricEyeCare',
        value: '$125',
      },
      {
        fromPanel: 'dmvVisionTest',
        value: '$125',
      },
      {
        fromPanel: 'childEyeExam',
        value: '$125',
      },
      {
        fromPanel: 'otherDoctorVisits',
        value: 'Cost Varies',
      },
    ],
    description: 'No vision insurance? No problem. Here are your available self-pay options.',
    navigateTo: 'location',
  },
  {
    id: 'existingContactLens',
    title: 'Current Contact Lens Wearer',
    img: false,
    price: '$195',
    description:
      'Get updated prescriptions for both contact lenses and glasses — perfect for existing wearers.',
    infoMessage:
      '<ul><li>Comprehensive eye health exam</li><li>Updated glasses prescription</li><li>Vision refraction for glasses</li><li>Visual field testing</li><li>Detailed vision evaluation</li><li>Consultation with an optometrist</li></ul>',
    navigateTo: 'location',
  },
  {
    id: 'newContactLens',
    title: 'First-Time Contact Lens Fitting',
    img: false,
    price: '$295',
    description: 'Contact lens exam, initial fitting, and follow-up visits included.',
    infoMessage:
      '<ul><li>Comprehensive eye health exam</li><li>Updated glasses prescription</li><li>Vision refraction for glasses</li><li>Visual field testing</li><li>Detailed vision evaluation</li><li>Consultation with an optometrist</li></ul>',
    navigateTo: 'location',
  },
  {
    id: 'downtown',
    title: 'Downtown Manhattan',
    img: false,
    badge: 'Open',
    meta: '9:00 AM – 8:00 PM',
    description: '123 Broadway Ave\nNew York, NY 10006\nNear Fulton St Station',
    navigateTo: 'selectDoctor',
  },
  {
    id: 'shopDistrict',
    title: 'Shopping District',
    img: false,
    badge: 'Open',
    meta: '10:00 AM – 9:00 PM',
    description: 'Mall at Manhattan, 3rd Floor\n456 7th Avenue\nNear Penn Station',
    navigateTo: 'selectDoctor',
  },
  {
    id: 'residentalArea',
    title: 'Residential Area',
    img: false,
    badge: 'Open',
    meta: '8:30 AM – 7:00 PM',
    description: '789 Riverside Dr\nNew York, NY 10032\nNear 157th St Station',
    navigateTo: 'selectDoctor',
  },
  {
    id: 'drEmilyCarter',
    title: 'Dr. Emily Carter',
    img: false,
    description: 'Specialist in Vision and Eye Health',
    navigateTo: 'selectVisitTime',
  },
  {
    id: 'drJamesWhitaker',
    title: 'Dr. James Whitaker',
    img: false,
    description: 'Experienced Eye Care Professional',
    navigateTo: 'selectVisitTime',
  },
  {
    id: 'availableDoctors',
    title: 'Any Doctor',
    img: false,
    description: 'Browse All Available Doctors',
    navigateTo: 'selectVisitTime',
  },
  {
    id: 'digitalOptometrist',
    title: 'Doctors from DigitalOptometrics™',
    disabledFor: ['contactLens', 'pediatricEyeCare', 'childEyeExam', 'otherDoctorVisits'],
    description: 'Doctors of Optometry',
    marker: true,
    img: false,
    navigateTo: 'selectVisitTime',
  },
];
