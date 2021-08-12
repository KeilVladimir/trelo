import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { authorAction } from './actions';

export const authorReducer = createReducer<string>('', {
  [authorAction.type]: (state, action: PayloadAction<string>) => {
    return action.payload;
  },
});
