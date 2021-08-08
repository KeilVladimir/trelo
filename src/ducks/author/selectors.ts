import { RootState } from '../index';
function getAuthor(store: RootState) {
  return store.author;
}

export { getAuthor };
