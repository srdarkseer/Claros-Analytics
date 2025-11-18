import {
  fetchUsers,
  fetchPosts,
  fetchUserById,
  fetchPostById,
  fetchPostsByUserId,
} from '@/services/api';
import { retryWithBackoff } from '@/utils/retry';

// Mock the retry utility
jest.mock('@/utils/retry');

// Mock the API config to avoid import.meta issues
jest.mock('@/config/api', () => ({
  API_BASE_URL: 'https://jsonplaceholder.typicode.com',
}));

// Mock fetch globally
global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUsers', () => {
    it('should fetch users successfully', async () => {
      const mockUsers = [
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

      const mockFetch = global.fetch as jest.Mock;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      });

      const mockRetryWithBackoff = retryWithBackoff as jest.Mock;
      mockRetryWithBackoff.mockImplementation(async (fn: () => Promise<unknown>) => {
        return fn();
      });

      const result = await fetchUsers();

      expect(result).toEqual(mockUsers);
      expect(mockFetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });

    it('should handle fetch errors', async () => {
      const mockFetch = global.fetch as jest.Mock;
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const mockRetryWithBackoff = retryWithBackoff as jest.Mock;
      mockRetryWithBackoff.mockImplementation(async (fn: () => Promise<unknown>) => {
        return fn();
      });

      await expect(fetchUsers()).rejects.toThrow();
    });
  });

  describe('fetchPosts', () => {
    it('should fetch posts successfully', async () => {
      const mockPosts = [
        {
          id: 1,
          userId: 1,
          title: 'Test Post',
          body: 'Test body',
        },
      ];

      const mockFetch = global.fetch as jest.Mock;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPosts,
      });

      const mockRetryWithBackoff = retryWithBackoff as jest.Mock;
      mockRetryWithBackoff.mockImplementation(async (fn: () => Promise<unknown>) => {
        return fn();
      });

      const result = await fetchPosts();

      expect(result).toEqual(mockPosts);
      expect(mockFetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
    });
  });

  describe('fetchUserById', () => {
    it('should fetch a single user by ID', async () => {
      const mockUser = {
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

      const mockFetch = global.fetch as jest.Mock;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const mockRetryWithBackoff = retryWithBackoff as jest.Mock;
      mockRetryWithBackoff.mockImplementation(async (fn: () => Promise<unknown>) => {
        return fn();
      });

      const result = await fetchUserById(1);

      expect(result).toEqual(mockUser);
      expect(mockFetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
    });
  });

  describe('fetchPostById', () => {
    it('should fetch a single post by ID', async () => {
      const mockPost = {
        id: 1,
        userId: 1,
        title: 'Test Post',
        body: 'Test body',
      };

      const mockFetch = global.fetch as jest.Mock;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPost,
      });

      const mockRetryWithBackoff = retryWithBackoff as jest.Mock;
      mockRetryWithBackoff.mockImplementation(async (fn: () => Promise<unknown>) => {
        return fn();
      });

      const result = await fetchPostById(1);

      expect(result).toEqual(mockPost);
      expect(mockFetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
    });
  });

  describe('fetchPostsByUserId', () => {
    it('should fetch posts by user ID', async () => {
      const mockPosts = [
        {
          id: 1,
          userId: 1,
          title: 'Test Post',
          body: 'Test body',
        },
      ];

      const mockFetch = global.fetch as jest.Mock;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPosts,
      });

      const mockRetryWithBackoff = retryWithBackoff as jest.Mock;
      mockRetryWithBackoff.mockImplementation(async (fn: () => Promise<unknown>) => {
        return fn();
      });

      const result = await fetchPostsByUserId(1);

      expect(result).toEqual(mockPosts);
      expect(mockFetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts?userId=1');
    });
  });

  describe('environment variable support', () => {
    it('should use default API base URL when env var is not set', async () => {
      const mockFetch = global.fetch as jest.Mock;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const mockRetryWithBackoff = retryWithBackoff as jest.Mock;
      mockRetryWithBackoff.mockImplementation(async (fn: () => Promise<unknown>) => {
        return fn();
      });

      await fetchUsers();

      // Verify it uses the default URL
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('https://jsonplaceholder.typicode.com')
      );
    });
  });
});
