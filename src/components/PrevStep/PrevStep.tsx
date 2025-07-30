import { getCard } from '../../mock/cards/getCard';
import { stores } from '../../mock/associationsList/associatioanList';
import { findAssociationsId } from '../../mock/associationsList/findAssociationsId';
import { useSelector } from '../../store';
import { screensSelector } from '../../store/screens/selectors';
import { useStepContent } from '../StepContent/useStepContent';
import styles from './PrevStep.module.scss';

interface PrevStepType {
  activeScreen: string;
}

export const PrevStep = ({ activeScreen }: PrevStepType) => {
  const { history } = useSelector(screensSelector);
  const { back } = useStepContent();

  const locationoptionCardId = history.find(item => item.screen === 'location')?.optionCard || '';
  const backendLocationId = findAssociationsId(locationoptionCardId, stores);
  const store = stores.find(s => s.BEField === backendLocationId);

  const firstHistoryoptionCard = history[0]?.optionCard || '';
  const singleProvidersList = getCard(firstHistoryoptionCard)?.singleProvider;

  let currentoptionCardId: string = '';

  if (singleProvidersList && store && store.performers) {
    const providers = store.performers;
    currentoptionCardId =
      singleProvidersList.find(pr => providers.some(provider => provider.FEField === pr)) || '';
  } else {
    currentoptionCardId = history[history.length - 1]?.optionCard || '';
  }

  const currentoptionCardData = getCard(currentoptionCardId);

  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{currentoptionCardData?.title}</h4>
      <button className={styles.button} onClick={() => back(1)}>
        <span className={styles.edit}>Edit</span>
      </button>
    </div>
  );
};
