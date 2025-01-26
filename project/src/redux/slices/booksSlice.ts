import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setError } from './errorSlice';
import { Book } from '../../types/Book';
import { RootState } from '../store';

interface BooksState {
  books: Book[];
  page: number;
  itemsPerPage: number;
}

const initialState: BooksState = {
  books: [],
  page: 1,
  itemsPerPage: 6,
};

export interface FetchBookListParams {
  isRead?: boolean;
  isFavorite?: boolean;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const fetchBookList = createAsyncThunk<
  Book[],
  FetchBookListParams,
  { state: RootState }
>(
  'books/fetchBookList',
  async ({ isRead, isFavorite, sortBy, order }, thunkAPI) => {
    try {
      const params = new URLSearchParams();
      if (isRead !== undefined) params.append('isRead', String(isRead));
      if (isFavorite !== undefined)
        params.append('isFavorite', String(isFavorite));
      if (sortBy) {
        params.append('_sort', order === 'asc' ? sortBy : `-${sortBy}`);
      }
      const { data } = await axios.get<Book[]>(
        `http://localhost:3000/books?${params}`
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.dispatch(setError(error.message));
      }
      return thunkAPI.rejectWithValue('Failed to fetch books');
    }
  }
);

export const addBookAsync = createAsyncThunk<
  Book,
  Partial<Book>,
  { state: RootState }
>('books/addBook', async (bookData, thunkAPI) => {
  try {
    const { data } = await axios.post<Book>(
      'http://localhost:3000/books',
      bookData
    );
    return data;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(setError(error.message));
    }
    return thunkAPI.rejectWithValue('Failed to add book');
  }
});

export const editBookAsync = createAsyncThunk<Book, Book, { state: RootState }>(
  'books/editBook',
  async (bookData, thunkAPI) => {
    try {
      const { data } = await axios.put<Book>(
        `http://localhost:3000/books/${bookData.id}`,
        bookData
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.dispatch(setError(error.message));
      }
      return thunkAPI.rejectWithValue('Failed to edit book');
    }
  }
);

export const deleteBookAsync = createAsyncThunk<
  string,
  string,
  { state: RootState }
>('books/deleteBook', async (bookId, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:3000/books/${bookId}`);
    return bookId;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(setError(error.message));
    }
    return thunkAPI.rejectWithValue('Failed to delete book');
  }
});

export const toggleFavoriteAsync = createAsyncThunk<
  Book,
  string,
  { state: RootState }
>('books/toggleFavorite', async (bookId, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const book = state.books.books.find((b) => b.id === bookId);
    if (!book) throw new Error('Book not found');

    const { data } = await axios.put<Book>(
      `http://localhost:3000/books/${bookId}`,
      {
        ...book,
        isFavorite: !book.isFavorite,
      }
    );
    return data;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(setError(error.message));
    }
    return thunkAPI.rejectWithValue('Failed to toggle favorite');
  }
});

export const toggleReadAsync = createAsyncThunk<
  Book,
  string,
  { state: RootState }
>('books/toggleRead', async (bookId, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const book = state.books.books.find((b) => b.id === bookId);
    if (!book) throw new Error('Book not found');

    const { data } = await axios.put<Book>(
      `http://localhost:3000/books/${bookId}`,
      {
        ...book,
        isRead: !book.isRead,
      }
    );
    return data;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(setError(error.message));
    }
    return thunkAPI.rejectWithValue('Failed to toggle read status');
  }
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchBookList.fulfilled,
        (state, action: PayloadAction<Book[]>) => {
          state.books = action.payload;
        }
      )
      .addCase(addBookAsync.fulfilled, (state, action: PayloadAction<Book>) => {
        state.books.push(action.payload);
      })
      .addCase(
        editBookAsync.fulfilled,
        (state, action: PayloadAction<Book>) => {
          const index = state.books.findIndex(
            (book) => book.id === action.payload.id
          );
          if (index !== -1) {
            state.books[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteBookAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.books = state.books.filter(
            (book) => book.id !== action.payload
          );
        }
      )
      .addCase(
        toggleFavoriteAsync.fulfilled,
        (state, action: PayloadAction<Book>) => {
          const index = state.books.findIndex(
            (book) => book.id === action.payload.id
          );
          if (index !== -1) {
            state.books[index] = action.payload;
          }
        }
      )
      .addCase(
        toggleReadAsync.fulfilled,
        (state, action: PayloadAction<Book>) => {
          const index = state.books.findIndex(
            (book) => book.id === action.payload.id
          );
          if (index !== -1) {
            state.books[index] = action.payload;
          }
        }
      );
  },
});

export const { setPage, setItemsPerPage } = booksSlice.actions;

export const selectBooks = (state: RootState) => state.books.books;
export const selectPage = (state: RootState) => state.books.page;
export const selectItemsPerPage = (state: RootState) =>
  state.books.itemsPerPage;

export default booksSlice.reducer;
