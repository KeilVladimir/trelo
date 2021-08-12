import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { columnReducer } from './column';
import { authorReducer } from './author';
import { commentReducer } from './comment';
import { cardReducer } from './card';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  author: authorReducer,
  comment: commentReducer,
  card: cardReducer,
  columns: columnReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
