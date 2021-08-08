import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { authorAction } from './actions';

const authorReducer = createReducer<string>('', {
  [authorAction.type]: (state, action: PayloadAction<string>) => {
    return action.payload;
  },
});

export default authorReducer;
