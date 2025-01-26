import { Sort } from '../../types/Sort';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface SortState {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  availableSortTypes: Sort[];
}

const initialState: SortState = {
  sortBy: '',
  sortOrder: 'asc',
  availableSortTypes: [],
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setAvailableSortTypes: (state, action: PayloadAction<Sort[]>) => {
      state.availableSortTypes = action.payload;
      state.sortBy = action.payload[0].sortType || '';
    },
    resetSort: () => {
      return initialState;
    },
  },
});

export const { setSortBy, setSortOrder, setAvailableSortTypes, resetSort } =
  sortSlice.actions;
export const selectSort = (state: RootState) => state.sort;
export default sortSlice.reducer;
