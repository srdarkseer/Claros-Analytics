import dataReducer, {
  setData,
  addDataItem,
  updateDataItem,
  removeDataItem,
  clearData,
  clearError,
  incrementRetryCount,
  resetRetryCount,
  initialState,
  fetchUsersAsync,
  fetchPostsAsync,
} from '@/store/slices/dataSlice';
import type { User, Post } from '@/types/api';

// Mock the API config to avoid import.meta issues
jest.mock('@/config/api', () => ({
  API_BASE_URL: 'https://jsonplaceholder.typicode.com',
}));

// Mock the API module
jest.mock('@/services/api');

describe('dataSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('reducers', () => {
    it('should return initial state', () => {
      expect(dataReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setData', () => {
      const mockData: User[] = [
        {
          id: 1,
          name: 'Test User',
          username: 'testuser',
          email: 'test@example.com',
          address: {
            street: '123 Main St',
            suite: 'Apt 1',
            city: 'Test City',
            zipcode: '12345',
            geo: { lat: '0', lng: '0' },
          },
          phone: '123-456-7890',
          website: 'test.com',
          company: {
            name: 'Test Company',
            catchPhrase: 'Test phrase',
            bs: 'Test bs',
          },
        },
      ];

      const action = setData(mockData);
      const state = dataReducer(initialState, action);

      expect(state.items).toEqual(mockData);
      expect(state.lastFetched).toBeDefined();
      expect(state.error).toBeNull();
    });

    it('should handle addDataItem', () => {
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        address: {
          street: '123 Main St',
          suite: 'Apt 1',
          city: 'Test City',
          zipcode: '12345',
          geo: { lat: '0', lng: '0' },
        },
        phone: '123-456-7890',
        website: 'test.com',
        company: {
          name: 'Test Company',
          catchPhrase: 'Test phrase',
          bs: 'Test bs',
        },
      };

      const action = addDataItem(mockUser);
      const state = dataReducer(initialState, action);

      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual(mockUser);
    });

    it('should handle updateDataItem', () => {
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        address: {
          street: '123 Main St',
          suite: 'Apt 1',
          city: 'Test City',
          zipcode: '12345',
          geo: { lat: '0', lng: '0' },
        },
        phone: '123-456-7890',
        website: 'test.com',
        company: {
          name: 'Test Company',
          catchPhrase: 'Test phrase',
          bs: 'Test bs',
        },
      };

      let state = dataReducer(initialState, addDataItem(mockUser));
      const action = updateDataItem({ id: 1, data: { name: 'Updated User' } });
      state = dataReducer(state, action);

      expect((state.items[0] as User).name).toBe('Updated User');
    });

    it('should handle removeDataItem', () => {
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        address: {
          street: '123 Main St',
          suite: 'Apt 1',
          city: 'Test City',
          zipcode: '12345',
          geo: { lat: '0', lng: '0' },
        },
        phone: '123-456-7890',
        website: 'test.com',
        company: {
          name: 'Test Company',
          catchPhrase: 'Test phrase',
          bs: 'Test bs',
        },
      };

      let state = dataReducer(initialState, addDataItem(mockUser));
      const action = removeDataItem(1);
      state = dataReducer(state, action);

      expect(state.items).toHaveLength(0);
    });

    it('should handle clearData', () => {
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        address: {
          street: '123 Main St',
          suite: 'Apt 1',
          city: 'Test City',
          zipcode: '12345',
          geo: { lat: '0', lng: '0' },
        },
        phone: '123-456-7890',
        website: 'test.com',
        company: {
          name: 'Test Company',
          catchPhrase: 'Test phrase',
          bs: 'Test bs',
        },
      };

      let state = dataReducer(initialState, addDataItem(mockUser));
      state = dataReducer(state, clearData());

      expect(state.items).toHaveLength(0);
      expect(state.lastFetched).toBeNull();
      expect(state.error).toBeNull();
    });

    it('should handle clearError', () => {
      let state = { ...initialState, error: 'Some error', retryCount: 3 };
      state = dataReducer(state, clearError());

      expect(state.error).toBeNull();
      expect(state.retryCount).toBe(0);
    });

    it('should handle incrementRetryCount', () => {
      const action = incrementRetryCount();
      const state = dataReducer(initialState, action);

      expect(state.retryCount).toBe(1);
    });

    it('should handle resetRetryCount', () => {
      let state = { ...initialState, retryCount: 5 };
      state = dataReducer(state, resetRetryCount());

      expect(state.retryCount).toBe(0);
    });
  });

  describe('async thunks', () => {
    it('should handle fetchUsersAsync.pending', () => {
      const action = fetchUsersAsync.pending('', undefined);
      const state = dataReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchUsersAsync.fulfilled', () => {
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'Test User',
          username: 'testuser',
          email: 'test@example.com',
          address: {
            street: '123 Main St',
            suite: 'Apt 1',
            city: 'Test City',
            zipcode: '12345',
            geo: { lat: '0', lng: '0' },
          },
          phone: '123-456-7890',
          website: 'test.com',
          company: {
            name: 'Test Company',
            catchPhrase: 'Test phrase',
            bs: 'Test bs',
          },
        },
      ];

      const action = fetchUsersAsync.fulfilled(mockUsers, '', undefined);
      const state = dataReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.items).toEqual(mockUsers);
      expect(state.lastFetched).toBeDefined();
      expect(state.error).toBeNull();
    });

    it('should handle fetchUsersAsync.rejected', () => {
      const action = fetchUsersAsync.rejected(
        new Error('Error message'),
        '',
        undefined,
        'Error message'
      );
      const state = dataReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Error message');
    });

    it('should handle fetchPostsAsync.pending', () => {
      const action = fetchPostsAsync.pending('', undefined);
      const state = dataReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchPostsAsync.fulfilled', () => {
      const mockPosts: Post[] = [
        {
          id: 1,
          userId: 1,
          title: 'Test Post',
          body: 'Test body',
        },
      ];

      const action = fetchPostsAsync.fulfilled(mockPosts, '', undefined);
      const state = dataReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.items).toEqual(mockPosts);
      expect(state.lastFetched).toBeDefined();
      expect(state.error).toBeNull();
    });

    it('should handle fetchPostsAsync.rejected', () => {
      const action = fetchPostsAsync.rejected(
        new Error('Error message'),
        '',
        undefined,
        'Error message'
      );
      const state = dataReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Error message');
    });
  });
});
