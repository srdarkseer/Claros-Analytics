import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers, fetchPosts } from '@/services/api';
import type { User, Post } from '@/types/api';

export type DataItem = User | Post;

export interface DataState {
  items: DataItem[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: DataState = {
  items: [],
  isLoading: false,
  error: null,
  lastFetched: null,
};

// Async thunks for API calls
export const fetchUsersAsync = createAsyncThunk(
  'data/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await fetchUsers();
      return users;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch users');
    }
  }
);

export const fetchPostsAsync = createAsyncThunk(
  'data/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const posts = await fetchPosts();
      return posts;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch posts');
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DataItem[]>) => {
      state.items = action.payload;
      state.lastFetched = Date.now();
      state.error = null;
    },
    addDataItem: (state, action: PayloadAction<DataItem>) => {
      state.items.push(action.payload);
    },
    updateDataItem: (
      state,
      action: PayloadAction<{ id: number | string; data: Partial<DataItem> }>
    ) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },
    removeDataItem: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearData: state => {
      state.items = [];
      state.lastFetched = null;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Fetch Users
    builder
      .addCase(fetchUsersAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Posts
    builder
      .addCase(fetchPostsAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setData, addDataItem, updateDataItem, removeDataItem, clearData, clearError } =
  dataSlice.actions;

// Selectors
export const selectDataItems = (state: { data: DataState }) => state.data.items;
export const selectIsLoading = (state: { data: DataState }) => state.data.isLoading;
export const selectDataError = (state: { data: DataState }) => state.data.error;
export const selectLastFetched = (state: { data: DataState }) => state.data.lastFetched;
export const selectDataItemById = (state: { data: DataState }, id: number | string) =>
  state.data.items.find(item => item.id === id);

export default dataSlice.reducer;
