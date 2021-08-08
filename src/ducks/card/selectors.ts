import { RootState } from '../index';

function getCard(store: RootState) {
  return store.card;
}

export { getCard };
