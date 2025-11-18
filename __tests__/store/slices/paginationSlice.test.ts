import paginationReducer, {
  setCurrentPage,
  setItemsPerPage,
  setTotalItems,
  nextPage,
  previousPage,
  resetPagination,
  initialState,
} from '@/store/slices/paginationSlice';

describe('paginationSlice', () => {
  it('should return initial state', () => {
    expect(paginationReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCurrentPage', () => {
    const action = setCurrentPage(5);
    const state = paginationReducer(initialState, action);

    expect(state.currentPage).toBe(5);
  });

  it('should handle setItemsPerPage and reset to page 1', () => {
    let state = paginationReducer(initialState, setCurrentPage(5));
    state = paginationReducer(state, setItemsPerPage(20));

    expect(state.itemsPerPage).toBe(20);
    expect(state.currentPage).toBe(1);
  });

  it('should handle setTotalItems', () => {
    const action = setTotalItems(100);
    const state = paginationReducer(initialState, action);

    expect(state.totalItems).toBe(100);
  });

  it('should handle nextPage when there are more pages', () => {
    let state = paginationReducer(initialState, setTotalItems(100));
    state = paginationReducer(state, setItemsPerPage(10)); // 10 pages total
    state = paginationReducer(state, setCurrentPage(1));
    state = paginationReducer(state, nextPage());

    expect(state.currentPage).toBe(2);
  });

  it('should not go beyond last page', () => {
    let state = paginationReducer(initialState, setTotalItems(100));
    state = paginationReducer(state, setItemsPerPage(10)); // 10 pages total
    state = paginationReducer(state, setCurrentPage(10));
    state = paginationReducer(state, nextPage());

    expect(state.currentPage).toBe(10); // Should stay at 10
  });

  it('should handle previousPage', () => {
    let state = paginationReducer(initialState, setCurrentPage(5));
    state = paginationReducer(state, previousPage());

    expect(state.currentPage).toBe(4);
  });

  it('should not go below page 1', () => {
    let state = paginationReducer(initialState, setCurrentPage(1));
    state = paginationReducer(state, previousPage());

    expect(state.currentPage).toBe(1); // Should stay at 1
  });

  it('should handle resetPagination', () => {
    let state = paginationReducer(initialState, setCurrentPage(5));
    state = paginationReducer(state, setTotalItems(100));
    state = paginationReducer(state, resetPagination());

    expect(state.currentPage).toBe(1);
    expect(state.totalItems).toBe(0);
  });
});
