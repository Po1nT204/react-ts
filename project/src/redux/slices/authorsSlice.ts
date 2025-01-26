import axios from 'axios';
import { Author } from '../../types/Author';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setError } from './errorSlice';
import { RootState } from '../store';

interface AuthorsState {
  potentialFavorites: Author[];
  favorites: Author[];
}

const initialState: AuthorsState = {
  potentialFavorites: [],
  favorites: [],
};

interface FetchFavoriteAuthorsParams {
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const fetchPotentialFavorites = createAsyncThunk<
  Author[],
  void,
  { state: RootState }
>('authors/fetchPotentialFavorites', async () => {
  const { data } = await axios.get<{ author: string; isFavorite: boolean }[]>(
    'http://localhost:3000/books?isFavorite=true'
  );
  const authorCounts = data.reduce<Record<string, number>>((acc, book) => {
    acc[book.author] = (acc[book.author] || 0) + 1;
    return acc;
  }, {});
  const potentialFavorites = Object.entries(authorCounts)
    .map(([name, count], i) => ({
      id: String(i),
      name,
      likedBooks: count,
    }))
    .filter((a) => a.likedBooks > 1);
  return potentialFavorites;
});

export const fetchFavoriteAuthors = createAsyncThunk<
  Author[],
  FetchFavoriteAuthorsParams,
  { state: RootState }
>('authors/fetchFavoriteAuthors', async ({ sortBy, order }, thunkAPI) => {
  try {
    const params = new URLSearchParams();
    if (sortBy) {
      params.append('_sort', order === 'asc' ? sortBy : `-${sortBy}`);
    }
    const { data } = await axios.get<Author[]>(
      `http://localhost:3000/authors?${params}`
    );
    return data;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(setError(error.message));
    }
    return thunkAPI.rejectWithValue('Failed to fetch authors');
  }
});

export const addFavoriteAuthor = createAsyncThunk<
  Author,
  Partial<Author>,
  { state: RootState }
>('authors/addFavoriteAuthor', async (author, thunkAPI) => {
  try {
    const { data } = await axios.post<Author>(
      'http://localhost:3000/authors',
      author
    );
    return data;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(setError(error.message));
    }
    return thunkAPI.rejectWithValue('Failed to add favorite author');
  }
});

export const editFavoriteAuthor = createAsyncThunk<
  Author,
  Author,
  { state: RootState }
>('authors/editFavoriteAuthor', async (authorInfo, thunkAPI) => {
  try {
    const { data } = await axios.put<Author>(
      `http://localhost:3000/authors/${authorInfo.id}`,
      authorInfo
    );
    return data;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(setError(error.message));
    }
    return thunkAPI.rejectWithValue('Failed to edit favorite author');
  }
});

export const deleteFavoriteAuthor = createAsyncThunk<
  string,
  string,
  { state: RootState }
>('authors/deleteFavoriteAuthor', async (id, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:3000/authors/${id}`);
    return id;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(setError(error.message));
    }
    return thunkAPI.rejectWithValue('Failed to delete favorite author');
  }
});

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPotentialFavorites.fulfilled,
        (state, action: PayloadAction<Author[]>) => {
          state.potentialFavorites = action.payload;
        }
      )
      .addCase(
        fetchFavoriteAuthors.fulfilled,
        (state, action: PayloadAction<Author[]>) => {
          state.favorites = action.payload;
        }
      )
      .addCase(
        addFavoriteAuthor.fulfilled,
        (state, action: PayloadAction<Author>) => {
          state.favorites.push(action.payload);
        }
      )
      .addCase(
        editFavoriteAuthor.fulfilled,
        (state, action: PayloadAction<Author>) => {
          const index = state.favorites.findIndex(
            (author) => author.id === action.payload.id
          );
          if (index !== -1) {
            state.favorites[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteFavoriteAuthor.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.favorites = state.favorites.filter(
            (author) => author.id !== action.payload
          );
        }
      );
  },
});

export const selectPotentialFavoriteAuthors = (state: RootState) =>
  state.authors.potentialFavorites;
export const selectFavoriteAuthors = (state: RootState) =>
  state.authors.favorites;
export default authorsSlice.reducer;
