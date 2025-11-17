import type { RootState } from './index';
import {
  selectDataItems as selectDataItemsBase,
  selectIsLoading as selectIsLoadingBase,
  selectLastFetched as selectLastFetchedBase,
  selectDataItemById as selectDataItemByIdBase,
} from './slices/dataSlice';
import {
  selectSearchQuery as selectSearchQueryBase,
  selectFilters as selectFiltersBase,
  selectFilterByKey as selectFilterByKeyBase,
} from './slices/filterSlice';
import {
  selectCurrentPage as selectCurrentPageBase,
  selectItemsPerPage as selectItemsPerPageBase,
  selectTotalItems as selectTotalItemsBase,
  selectTotalPages as selectTotalPagesBase,
  selectHasNextPage as selectHasNextPageBase,
  selectHasPreviousPage as selectHasPreviousPageBase,
} from './slices/paginationSlice';
import {
  selectErrorMessage as selectErrorMessageBase,
  selectErrorCode as selectErrorCodeBase,
  selectHasError as selectHasErrorBase,
} from './slices/errorSlice';

// Data selectors
export const selectDataItems = (state: RootState) => selectDataItemsBase(state);
export const selectIsLoading = (state: RootState) => selectIsLoadingBase(state);
export const selectLastFetched = (state: RootState) => selectLastFetchedBase(state);
export const selectDataItemById = (state: RootState, id: number | string) =>
  selectDataItemByIdBase(state, id);

// Filter selectors
export const selectSearchQuery = (state: RootState) => selectSearchQueryBase(state);
export const selectFilters = (state: RootState) => selectFiltersBase(state);
export const selectFilterByKey = (state: RootState, key: string) =>
  selectFilterByKeyBase(state, key);

// Pagination selectors
export const selectCurrentPage = (state: RootState) => selectCurrentPageBase(state);
export const selectItemsPerPage = (state: RootState) => selectItemsPerPageBase(state);
export const selectTotalItems = (state: RootState) => selectTotalItemsBase(state);
export const selectTotalPages = (state: RootState) => selectTotalPagesBase(state);
export const selectHasNextPage = (state: RootState) => selectHasNextPageBase(state);
export const selectHasPreviousPage = (state: RootState) => selectHasPreviousPageBase(state);

// Error selectors
export const selectErrorMessage = (state: RootState) => selectErrorMessageBase(state);
export const selectErrorCode = (state: RootState) => selectErrorCodeBase(state);
export const selectHasError = (state: RootState) => selectHasErrorBase(state);

// Computed selectors
export const selectFilteredData = (state: RootState) => {
  const items = selectDataItems(state);
  const searchQuery = selectSearchQuery(state).toLowerCase();
  const filters = selectFilters(state);

  if (!searchQuery && Object.keys(filters).length === 0) {
    return items;
  }

  return items.filter(item => {
    // Search query filter
    if (searchQuery) {
      const matchesSearch = Object.values(item).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery);
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchQuery);
        }
        return false;
      });
      if (!matchesSearch) return false;
    }

    // Additional filters
    for (const [key, filterValue] of Object.entries(filters)) {
      if (item[key] !== filterValue) {
        return false;
      }
    }

    return true;
  });
};

export const selectPaginatedData = (state: RootState) => {
  const filteredData = selectFilteredData(state);
  const currentPage = selectCurrentPage(state);
  const itemsPerPage = selectItemsPerPage(state);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filteredData.slice(startIndex, endIndex);
};
