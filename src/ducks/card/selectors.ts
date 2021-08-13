import { RootState } from '../index';
import { createSelector } from 'reselect';

export const getStateForCards = (state: RootState) => state.card;

export const getCard = createSelector(getStateForCards, (state) => state);
