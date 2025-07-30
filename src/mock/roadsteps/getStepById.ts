import { roadsteps } from "./roadsteps";

export function getStepById(id_: string) {
  return roadsteps.find((item) => item.id === id_) || null;
}
