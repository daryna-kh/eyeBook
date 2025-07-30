import { useEffect, useRef, useState } from 'react';
import { formatTime } from '../../helpers/helpers';
import { useDispatch } from '../../store';
import { setActiveScreen } from '../../store/screens';
import { useStepContent } from '../StepContent/useStepContent';
import styles from './Slots.module.scss';

export const Slots = ({ slots, selected }: { slots: string[]; selected: string | null }) => {
  const dispatch = useDispatch();
  const { updateHistory } = useStepContent();
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.classList.remove('fade-in');
      void el.offsetWidth;
      el.classList.add('fade-in');
    }
  }, [slots]);

  if ((slots === undefined || slots.length === 0) && !selected) {
    return <p>No available slots</p>;
  }

  return (
    <ul ref={ref} className={styles.slots}>
      {slots.map((slot, index) => {
        return (
          <li
            className={styles.slot}
            key={`slot-${slot}-${index}`}
            onClick={() => {
              updateHistory('', `${selected}_${slot}`, null);
              dispatch(setActiveScreen('personalInformation'));
            }}
          >
            {formatTime(slot)}
          </li>
        );
      })}
    </ul>
  );
};
