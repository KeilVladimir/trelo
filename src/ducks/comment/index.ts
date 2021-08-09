import { addComment, deleteComment, renameComment } from './actions';
import { commentReducer } from './reducers';
import { getComments } from './selectors';

export default commentReducer;
export { addComment, getComments, deleteComment, renameComment };
