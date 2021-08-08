import { authorAction } from './actions';
import authorReducer from './reducers';
import { getAuthor } from './selectors';

export default authorReducer;
export { authorAction, getAuthor };
