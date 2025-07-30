import { stepsContent } from './stepsContent';
import { StepContent } from './type';

export function getStepContentById(id_: string) {
  return stepsContent.find(step => step.id === id_) || null;
}
