import { RootState } from '../index';
import { createSelector } from 'reselect';

export const getComment = (state: RootState) => state.comment;

export const getComments = createSelector(getComment, (state) => state);
