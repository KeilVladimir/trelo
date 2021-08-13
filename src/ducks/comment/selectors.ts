import { RootState } from '../index';
import { createSelector } from 'reselect';

export const getStateForComments = (state: RootState) => state.comment;

export const getComments = createSelector(
  getStateForComments,
  (state) => state,
);
