import filterReducer, {
  setSearchQuery,
  setFilter,
  removeFilter,
  clearFilters,
  initialState,
} from '@/store/slices/filterSlice';

describe('filterSlice', () => {
  it('should return initial state', () => {
    expect(filterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSearchQuery', () => {
    const action = setSearchQuery('test query');
    const state = filterReducer(initialState, action);

    expect(state.searchQuery).toBe('test query');
  });

  it('should handle setFilter', () => {
    const action = setFilter({ key: 'status', value: 'active' });
    const state = filterReducer(initialState, action);

    expect(state.filters.status).toBe('active');
  });

  it('should handle multiple filters', () => {
    let state = filterReducer(initialState, setFilter({ key: 'status', value: 'active' }));
    state = filterReducer(state, setFilter({ key: 'type', value: 'user' }));

    expect(state.filters.status).toBe('active');
    expect(state.filters.type).toBe('user');
  });

  it('should handle removeFilter', () => {
    let state = filterReducer(initialState, setFilter({ key: 'status', value: 'active' }));
    state = filterReducer(state, removeFilter('status'));

    expect(state.filters.status).toBeUndefined();
  });

  it('should handle clearFilters', () => {
    let state = filterReducer(initialState, setSearchQuery('test'));
    state = filterReducer(state, setFilter({ key: 'status', value: 'active' }));
    state = filterReducer(state, clearFilters());

    expect(state.searchQuery).toBe('');
    expect(Object.keys(state.filters)).toHaveLength(0);
  });
});
