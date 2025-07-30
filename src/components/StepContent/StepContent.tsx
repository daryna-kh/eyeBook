import { useSelector } from '../../store';
import { screensSelector } from '../../store/screens/selectors';
import { BookingResult } from '../BookingResult/BookingResult';
import { Scheduler } from '../Scheduler/Scheduler';
import { UserForm } from '../UserForm/UserForm';
import { OptionCard } from '../OptionCard/OptionCard';
import { CustomSpin } from '../CustomSpin/CustomSpin';
import { getStepContentById } from '../../mock/stepsContent/getStepContentById';
import styles from './StepContent.module.scss';
import { Insurance } from '../Insurance/Insurance';
import { PrevStep } from '../PrevStep/PrevStep';
import { Arrow } from '../../share/icons/Arrow';
import { useStepContent } from './useStepContent';

const componentRegistry: Record<string, React.FC> = {
  insurances: Insurance,
};

const renderDynamicComponent = (componentKey?: string) => {
  if (!componentKey) return null;
  const Component = componentRegistry[componentKey];
  return Component ? <Component /> : null;
};

export const StepContent = () => {
  const { activeScreen, loaded } = useSelector(screensSelector);
  const currentStep = getStepContentById(activeScreen);
  const { back, ref } = useStepContent();

  if (!loaded) return <CustomSpin />;
  if (!currentStep) return null;

  const {
    title,
    description,
    cards,
    forms,
    scheduler,
    component,
    backButtonsAvailable,
    showBreadcrumb,
  } = currentStep;

  return (
    <div className={styles.content}>
      <div className={`${styles.inner}`}>
        {backButtonsAvailable && (
          <div className={styles.back}>
            <button onClick={() => back(1)}>
              <Arrow />
            </button>
          </div>
        )}

        {(title || description) && (
          <div className={`${styles.content_Header} width-660`}>
            {title && <h1>{title}</h1>}
            {description && <p>{description}</p>}
          </div>
        )}

        {showBreadcrumb && (
          <div className={`${styles.optionWrapper} width-660`}>
            <PrevStep activeScreen={activeScreen} />
          </div>
        )}

        {scheduler && <Scheduler />}
        {forms === 'user' && <UserForm id={forms} />}

        {cards && (
          <div ref={ref} className={`${styles.optionWrapper} width-660`}>
            {renderDynamicComponent(component)}
            {cards?.map((cardId, index) => (
              <OptionCard key={`OptionCard-${cardId}-${index}`} id={cardId} />
            ))}
          </div>
        )}

        {activeScreen === 'finish' && <BookingResult />}
      </div>
    </div>
  );
};
