import { RootState } from '../index';

function getColumns(store: RootState) {
  return store.columns;
}

export default getColumns;
