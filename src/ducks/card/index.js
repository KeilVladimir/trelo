import { addCard, deleteCard, renameCard } from './actions';
import cardReducer from './reducers';
import { getCard } from './selectors';

export default cardReducer;
export { getCard, addCard, deleteCard, renameCard };
