import axios from 'axios';
import { Quote } from '../../types/Quote';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setError } from './errorSlice';
import { RootState } from '../store';

interface QuotesState {
  quotes: Quote[];
}

const initialState: QuotesState = {
  quotes: [],
};

interface FetchQuotesListParams {
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const fetchQuotes = createAsyncThunk<
  Quote[],
  FetchQuotesListParams,
  { state: RootState }
>('quotes/fetchQuotes', async ({ sortBy, order }, thunkAPI) => {
  try {
    const params = new URLSearchParams();
    if (sortBy) {
      if (order === 'asc') params.append('_sort', sortBy);
      else params.append('_sort', `-${sortBy}`);
    }
    const { data } = await axios.get(`http://localhost:3000/quotes?${params}`);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(setError(error.message));
    }
    return thunkAPI.rejectWithValue('Failed to fetch quotes');
  }
});

export const addQuote = createAsyncThunk<
  Quote,
  Partial<Quote>,
  { state: RootState }
>('quotes/addQuote', async (quote, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:3000/quotes', quote);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(setError(error.message));
    }
    return thunkAPI.rejectWithValue('Failed to add quote');
  }
});

export const editQuote = createAsyncThunk<Quote, Quote, { state: RootState }>(
  'quotes/editQuote',
  async (quoteInfo, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/quotes/${quoteInfo.id}`,
        quoteInfo
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.dispatch(setError(error.message));
      }
      return thunkAPI.rejectWithValue('Failed to edit quote');
    }
  }
);

export const deleteQuote = createAsyncThunk<
  string,
  string,
  { state: RootState }
>('quotes/deleteQuote', async (id, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:3000/quotes/${id}`);
    return id;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(setError(error.message));
    }
    return thunkAPI.rejectWithValue('Failed to delete quote');
  }
});

const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchQuotes.fulfilled,
        (state, action: PayloadAction<Quote[]>) => {
          state.quotes = action.payload;
        }
      )
      .addCase(addQuote.fulfilled, (state, action: PayloadAction<Quote>) => {
        state.quotes.push(action.payload);
      })
      .addCase(editQuote.fulfilled, (state, action: PayloadAction<Quote>) => {
        const { id, ...updatedFields } = action.payload;
        const index = state.quotes.findIndex((quote) => quote.id === id);
        if (index !== -1) {
          state.quotes[index] = {
            ...state.quotes[index],
            ...updatedFields,
          };
        }
      })
      .addCase(
        deleteQuote.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.quotes = state.quotes.filter(
            (quote) => quote.id !== action.payload
          );
        }
      );
  },
});

export const selectQuotes = (state: RootState) => state.quotes.quotes;
export default quoteSlice.reducer;
