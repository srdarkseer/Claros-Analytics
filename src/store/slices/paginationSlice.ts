import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page when changing items per page
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    nextPage: state => {
      const totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
      if (state.currentPage < totalPages) {
        state.currentPage += 1;
      }
    },
    previousPage: state => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    resetPagination: state => {
      state.currentPage = 1;
      state.totalItems = 0;
    },
  },
});

export const {
  setCurrentPage,
  setItemsPerPage,
  setTotalItems,
  nextPage,
  previousPage,
  resetPagination,
} = paginationSlice.actions;

// Selectors
export const selectCurrentPage = (state: { pagination: PaginationState }) =>
  state.pagination.currentPage;
export const selectItemsPerPage = (state: { pagination: PaginationState }) =>
  state.pagination.itemsPerPage;
export const selectTotalItems = (state: { pagination: PaginationState }) =>
  state.pagination.totalItems;
export const selectTotalPages = (state: { pagination: PaginationState }) =>
  Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);
export const selectHasNextPage = (state: { pagination: PaginationState }) => {
  const totalPages = Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);
  return state.pagination.currentPage < totalPages;
};
export const selectHasPreviousPage = (state: { pagination: PaginationState }) =>
  state.pagination.currentPage > 1;

export default paginationSlice.reducer;
