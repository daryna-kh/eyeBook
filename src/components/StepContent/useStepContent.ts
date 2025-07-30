import { useEffect, useRef } from 'react';
import { findProviderAndServiceByLocation } from '../../helpers/findProviderAndServiceByLocation';
import { getPriceFromMockData } from '../../helpers/helpers';
import { getCard } from '../../mock/cards/getCard';
import { stores } from '../../mock/associationsList/associatioanList';
import { findAssociationsId } from '../../mock/associationsList/findAssociationsId';
import { useDispatch, useSelector } from '../../store';
import { useFetchAvailableTimes } from '../../store/availableTimeSlice/useFetchAvailableTimes';
import { setActiveScreen, setHistory, setPrevScreen, setPrice } from '../../store/screens';
import { screensSelector } from '../../store/screens/selectors';

export const useStepContent = () => {
  const dispatch = useDispatch();
  const { activeScreen, history } = useSelector(screensSelector);
  const ref = useRef<HTMLDivElement>(null);

  const locationStoreVal = findItemInHistory('location')?.optionCard || '';
  let doctorStoreVal = findItemInHistory('selectDoctor')?.optionCard || '';
  const userData = findItemInHistory('personalInformation')?.personalDetails || null;
  const location = findAssociationsId(locationStoreVal, stores);
  const result = findProviderAndServiceByLocation(location, history);

  const requestParams = {
    service: result.service,
    location: location,
    provider: result.provider,
  };

  const { fetchLoading } = useFetchAvailableTimes(requestParams);

  function findItemInHistory(id: string) {
    return history.find(item => item.screen === id);
  }

  function updateHistory(
    optionCardID?: string,
    date?: string,
    userData?: null | { [key in string]: string },
  ) {
    if (optionCardID) {
      const optionCard = getCard(optionCardID);

      if (optionCard?.price) {
        const price = getPriceFromMockData(optionCard?.price || '', history);
        dispatch(setPrice(price));
      }
    }

    dispatch(
      setHistory([
        ...history,
        {
          screen: activeScreen,
          optionCard: optionCardID ? optionCardID : '',
          date: date ? date : '',
          personalDetails: userData ? userData : null,
        },
      ]),
    );

    dispatch(setPrevScreen(activeScreen));

    if (optionCardID === undefined) return;

    const optionCard = getCard(optionCardID);

    if (optionCard) {
      if (activeScreen === 'location') {
        const singleProvidersList = getCard(history[0].optionCard || '')?.singleProvider;
        if (singleProvidersList) {
          dispatch(setActiveScreen('selectVisitTime'));
        } else {
          dispatch(setActiveScreen(optionCard.navigateTo));
        }
      } else {
        dispatch(setActiveScreen(optionCard.navigateTo));
      }
    }
  }

  function findPrevScreenIndex(screenId: string) {
    const index = history.findIndex(item => item.screen === screenId);
    if (index === -1) {
      return;
    }
    back(history.length - index);
  }

  function back(num: number) {
    const history_ = [...history];

    if (num > history.length) {
      console.warn(`Cannot go back ${num} screens. History only contains ${history.length} items.`);
      return;
    }

    const lastHistoryItem = history_[history_.length - num];
    const prevScreenID = lastHistoryItem?.screen;

    history_.length = history_.length - num;

    dispatch(setHistory([...history_]));

    if (prevScreenID) {
      dispatch(setActiveScreen(prevScreenID));
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.remove('step-animated');
      void ref.current.offsetWidth;
      ref.current.classList.add('step-animated');
    }
  }, [activeScreen]);

  return {
    findItemInHistory,
    updateHistory,
    back,
    userData,
    findPrevScreenIndex,
    locationStoreVal,
    doctorStoreVal,
    location,
    requestParams,
    ref,
  };
};
