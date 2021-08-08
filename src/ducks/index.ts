import { configureStore } from '@reduxjs/toolkit';
import { columnReducer } from './column/columnReducer';
import authorReducer from './author';
import commentReducer from './comment';
import cardReducer from './card';
export const store = configureStore({
  reducer: {
    columns: columnReducer,
    author: authorReducer,
    comment: commentReducer,
    card: cardReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
