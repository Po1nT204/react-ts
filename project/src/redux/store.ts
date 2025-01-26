import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import quotesReducer from './slices/quotesSlice';
import authorsReducer from './slices/authorsSlice';
import filterReducer from './slices/filterSlice';
import sortReducer from './slices/sortSlice';
import errorReducer from './slices/errorSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    quotes: quotesReducer,
    authors: authorsReducer,
    filter: filterReducer,
    sort: sortReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
