import { Progress } from 'antd';
import { useMemo } from 'react';
import { getCard } from '../../mock/cards/getCard';
import { roadsteps } from '../../mock/roadsteps/roadsteps';
import { getStepContentById } from '../../mock/stepsContent/getStepContentById';
import { useSelector } from '../../store';
import { screensSelector } from '../../store/screens/selectors';

export const Timeline = () => {
  const { activeScreen, history } = useSelector(screensSelector);
  const activeScreenStep = getStepContentById(activeScreen)?.step;

  const computedAvailableSteps = useMemo(() => {
    if (history.length > 0 && history[0].optionCard) {
      const firstoptionCardData = getCard(history[0].optionCard);
      if (firstoptionCardData?.skipSteps) {
        const skipSteps = firstoptionCardData.skipSteps;
        return roadsteps.filter(step => !skipSteps.includes(step.id));
      }
    }
    return roadsteps;
  }, [history[0]?.optionCard]);

  const currentIndex = computedAvailableSteps.findIndex(step => step.id === activeScreenStep);
  const totalSteps = computedAvailableSteps.length;
  const percent = ((currentIndex + 1) / totalSteps) * 100;

  return (
    <Progress
      percent={percent}
      status={percent < 100 ? 'active' : 'success'}
      showInfo={false}
      strokeWidth={8}
      strokeColor='#059669'
      size={{ height: 3 }}
    />
  );
};
