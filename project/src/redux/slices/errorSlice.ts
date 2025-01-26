import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ErrorState {
  errorMessage: string;
}

const initialState: ErrorState = {
  errorMessage: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    clearError: () => {
      return initialState;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export const selectErrorMessage = (state: RootState) =>
  state.error.errorMessage;
export default errorSlice.reducer;
