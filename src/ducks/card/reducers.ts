import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../../types';
import * as cardActions from './actions';

const cardReducer = createReducer<Card[]>([], {
  [cardActions.renameCard.type]: (state, action: PayloadAction<Card>) => {
    console.log(action.payload);
    return state.map((card) => {
      card.id === action.payload.id ? (card = action.payload) : card;
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

export default cardReducer;
