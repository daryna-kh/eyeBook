import { getCard } from '../mock/cards/getCard';
import { stores } from '../mock/associationsList/associatioanList';
import { HistoryItem } from '../store/screens/types';

export function findProviderAndServiceByLocation(
  location: string,
  history: HistoryItem[],
): {
  provider: string[];
  service: string;
} {
  const store = stores.find(s => s.BEField === location);
  if (!store) {
    return { provider: [], service: '' };
  }

  let provider: string[] = [];

  const visitType = history[0].optionCard || '';
  let doctorStoreVal = history.find(item => item.screen === 'selectDoctor')?.optionCard || '';
  const visitTypeObj = getCard(visitType);

  if (store.performers) {
    const providers = store.performers;
    const singleProvidersList = visitTypeObj?.singleProvider;

    if (singleProvidersList) {
      doctorStoreVal =
        singleProvidersList.find(
          pr => providers.find(provider => provider.FEField === pr)?.FEField,
        ) || '';
    }

    if (doctorStoreVal === 'availableDoctors') {
      const disabledProvider = providers.find(
        provider => getCard(provider.FEField)?.disabledFor,
      )?.FEField;

      let isDisabled = false;
      if (disabledProvider) {
        isDisabled = history.some(
          item =>
            item.optionCard && getCard(disabledProvider)?.disabledFor?.includes(item.optionCard),
        );
      }

      provider = providers
        .filter(provider => !(isDisabled && provider.FEField === disabledProvider))
        .map(provider => provider.BEField);
    } else {
      const foundProvider = providers.find(provider => provider.FEField === doctorStoreVal);
      provider = foundProvider ? [foundProvider.BEField] : [];
    }
  }

  let service = '';
  if (store.services) {
    const services = store.services;

    let serviceVal: string;

    if (visitTypeObj?.hasSubOption) {
      serviceVal = history.find(item => item.screen === visitTypeObj.navigateTo)?.optionCard || '';
    } else {
      serviceVal = visitType;
    }

    const foundService = services.find(service => service.FEField === serviceVal);
    service = foundService ? foundService.BEField : '';
  }

  return { provider, service };
}
