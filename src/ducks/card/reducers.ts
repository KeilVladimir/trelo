import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Card, RefactorCard } from '../../types';
import * as cardActions from './actions';

export const cardReducer = createReducer<Card[]>([], {
  [cardActions.renameCard.type]: (
    state,
    action: PayloadAction<RefactorCard>,
  ) => {
    state.map((card) => {
      if (card.id === action.payload.id) {
        card.name = action.payload.name;
        card.about = action.payload.about;
      }
      return card;
    });
  },
  [cardActions.deleteCard.type]: (state, action: PayloadAction<number>) => {
    return state.filter((card) => card.id !== action.payload);
  },
  [cardActions.addCard.type]: (state, action: PayloadAction<Card>) => {
    state.push(action.payload);
  },
});
