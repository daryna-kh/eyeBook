import { forms } from "./forms";

export function getFormById(id_: string) {
  return forms.find((form) => form.id === id_) || null;
}
