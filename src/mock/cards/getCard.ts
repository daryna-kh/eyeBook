import { cards } from './cards';

export function getCard(id_: string) {
  return cards.find(card => card.id === id_);
}
