import { columnAction } from './actions';
import columnReducer from './columnReducer';
import { getColumn } from './selectors';

export default columnReducer;
export { columnAction, getColumn };
