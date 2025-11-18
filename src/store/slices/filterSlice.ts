import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  searchQuery: string;
  filters: Record<string, unknown>;
}

export const initialState: FilterState = {
  searchQuery: '',
  filters: {},
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilter: (state, action: PayloadAction<{ key: string; value: unknown }>) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      delete state.filters[action.payload];
    },
    clearFilters: state => {
      state.searchQuery = '';
      state.filters = {};
    },
  },
});

export const { setSearchQuery, setFilter, removeFilter, clearFilters } = filterSlice.actions;

// Selectors
export const selectSearchQuery = (state: { filter: FilterState }) => state.filter.searchQuery;
export const selectFilters = (state: { filter: FilterState }) => state.filter.filters;
export const selectFilterByKey = (state: { filter: FilterState }, key: string) =>
  state.filter.filters[key];

export default filterSlice.reducer;
