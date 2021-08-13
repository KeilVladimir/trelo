import { RootState } from '../index';
import { createSelector } from 'reselect';

export const getStateForColumns = (state: RootState) => state.columns;

export const getColumns = createSelector(getStateForColumns, (state) => state);
