import { RootState } from '../index';
import { createSelector } from 'reselect';

export const getStateForAuthor = (state: RootState) => state.author;

export const getAuthor = createSelector(getStateForAuthor, (state) => state);
