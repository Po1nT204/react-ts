import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FilterState {
  onlyFavorite: boolean;
  onlyRead: boolean;
  onlyNotRead: boolean;
}

const initialState: FilterState = {
  onlyFavorite: false,
  onlyRead: false,
  onlyNotRead: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setOnlyFavoriteFilter: (state) => {
      state.onlyFavorite = !state.onlyFavorite;
    },
    setOnlyReadFilter: (state) => {
      state.onlyRead = !state.onlyRead;
      state.onlyNotRead = false;
    },
    setOnlyNotReadFilter: (state) => {
      state.onlyNotRead = !state.onlyNotRead;
      state.onlyRead = false;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setOnlyFavoriteFilter,
  setOnlyReadFilter,
  setOnlyNotReadFilter,
  resetFilters,
} = filterSlice.actions;
export const selectOnlyFavoriteFilter = (state: RootState) =>
  state.filter.onlyFavorite;
export const selectOnlyReadFilter = (state: RootState) => state.filter.onlyRead;
export const selectOnlyNotReadFilter = (state: RootState) =>
  state.filter.onlyNotRead;
export default filterSlice.reducer;
