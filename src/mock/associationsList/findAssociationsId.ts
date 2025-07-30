import { AssociationType } from './types';

export function findAssociationsId(id: string, data: AssociationType[]) {
  const found = data.find(item => item.FEField === id);
  return found?.BEField || id;
}
