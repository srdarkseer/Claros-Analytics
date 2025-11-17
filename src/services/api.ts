import type { User, Post } from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

/**
 * Generic API fetch function with error handling
 */
async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API Error: ${error.message}`);
    }
    throw new Error('An unknown error occurred');
  }
}

/**
 * Fetch all users from the API
 */
export const fetchUsers = async (): Promise<User[]> => {
  return fetchAPI<User[]>('/users');
};

/**
 * Fetch a single user by ID
 */
export const fetchUserById = async (id: number): Promise<User> => {
  return fetchAPI<User>(`/users/${id}`);
};

/**
 * Fetch all posts from the API
 */
export const fetchPosts = async (): Promise<Post[]> => {
  return fetchAPI<Post[]>('/posts');
};

/**
 * Fetch posts by user ID
 */
export const fetchPostsByUserId = async (userId: number): Promise<Post[]> => {
  return fetchAPI<Post[]>(`/posts?userId=${userId}`);
};

/**
 * Fetch a single post by ID
 */
export const fetchPostById = async (id: number): Promise<Post> => {
  return fetchAPI<Post>(`/posts/${id}`);
};
