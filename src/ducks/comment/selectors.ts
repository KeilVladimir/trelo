import { RootState } from '../index';
function getComments(store: RootState) {
  return store.comment;
}

export default getComments;
