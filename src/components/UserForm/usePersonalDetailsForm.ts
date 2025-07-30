import { useState } from 'react';
import * as Yup from 'yup';
import { getFormById } from '../../mock/forms/getFormById';
import { InsuranceType } from '../../mock/forms/type';
import { useSelector } from '../../store';
import { screensSelector } from '../../store/screens/selectors';
import { formatTime } from '../../helpers/helpers';
import { getCard } from '../../mock/cards/getCard';
import { findAssociationsId } from '../../mock/associationsList/findAssociationsId';
import { stores } from '../../mock/associationsList/associatioanList';

export const useUserForm = () => {
  const { history } = useSelector(screensSelector);

  const [showDependedFields, setShowDependedFields] = useState<boolean>(false);
  const [insuranceData, setInsuranceData] = useState<{
    group: string;
    id: string;
    optionCard: string;
    price: string;
    infoMessage?: string;
  }>({
    group: '',
    id: '',
    optionCard: '',
    price: '',
    infoMessage: '',
  });

  const isOtherDoctorVisit = history.find(item => item.optionCard === 'otherDoctorVisits') || null;

  function formattChoosenOptions() {
    const appoirtmentDetails: { [key: string]: string } = {
      examType: '',
      insuranceOptions: '',
      contactLensesOptions: '',
      location: '',
      selectDoctor: '',
      selectVisitTime: '',
    };

    history.forEach(item => {
      if (item.date) {
        const [day, time] = item.date.split('_');
        const [year, month, day_] = day.split('-');

        appoirtmentDetails.selectVisitTime = `${month}.${day_}.${year}, ${formatTime(time)}`;
      } else {
        if (item.optionCard) {
          const screen_ = item.screen;
          appoirtmentDetails[screen_] = item.optionCard;
        }
      }
    });

    const locationStoreVal = history.find(item => item.screen === 'location')?.optionCard || '';
    const location_ = findAssociationsId(locationStoreVal, stores);
    const store = stores.find(s => s.BEField === location_);

    const singleProvidersList = getCard(history[0].optionCard || '')?.singleProvider;
    let doctorStoreVal = '';

    if (singleProvidersList && store && store.performers) {
      const providers = store.performers;
      doctorStoreVal =
        singleProvidersList.find(
          pr => providers.find(provider => provider.FEField === pr)?.FEField,
        ) || '';
      appoirtmentDetails.selectDoctor = doctorStoreVal;
    }

    return appoirtmentDetails;
  }

  function findOptionName(str: string) {
    const form = getFormById('insurances');
    const fields = form?.fields as InsuranceType[];
    const optionName = fields
      .find(field => field.options.some(opt => opt.id === str))
      ?.options.find(opt => opt.id === str);
    return optionName || null;
  }

  function isInsuranceIncluded() {
    const isIncurance = history.find(item => item.screen === 'insuranceOptions');
    if (!isIncurance || !isIncurance.optionCard) return;

    const insuranceForm = getFormById('insurances');
    if (!insuranceForm) return;

    const fields = insuranceForm.fields as InsuranceType[];

    const insuranceGroup = fields.find(field => {
      const options_ = field.options as { [key in string]: string }[];
      return options_.some(opt => opt.id === isIncurance.optionCard);
    });

    const optionGroup = findOptionName(isIncurance?.optionCard);

    setInsuranceData({
      group: insuranceGroup?.id || '',
      id: optionGroup?.id || '',
      optionCard: optionGroup?.name || '',
      price: insuranceGroup?.price || '',
      infoMessage: '',
    });

    if (insuranceGroup?.showInUserDataForm) {
      setShowDependedFields(!showDependedFields);
    }
  }

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Required').min(2, 'Too Short!').max(30, 'Too Long!'),
    email: Yup.string()
      .required('Required')
      .max(30, 'Too Long!')
      .matches(/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/, 'Invalid email format'),
    phone: Yup.string()
      .required('Required')
      .matches(/^(\+?\d{1,2})? ?\(?\d{3}\)? ?\d{3}-\d{4}$/, 'Phone number format is invalid')
      .test('max-digits', 'Phone number must contain up to 12 digits', value => {
        if (!value) return false;
        const digits = value.replace(/\D/g, '');
        return digits.length <= 12;
      }),
    insurance: Yup.string().notRequired(),
    note: Yup.lazy(val => {
      if (isOtherDoctorVisit) {
        return Yup.string()
          .max(1000, 'Too Long!')
          .required('Please specify the purpose of your visit');
      }
      return Yup.string().max(1000, 'Too Long!').notRequired();
    }),
  });

  return {
    formattChoosenOptions,
    isInsuranceIncluded,
    showDependedFields,
    setShowDependedFields,
    insuranceData,
    setInsuranceData,
    validationSchema,
    findOptionName,
    isOtherDoctorVisit,
  };
};
