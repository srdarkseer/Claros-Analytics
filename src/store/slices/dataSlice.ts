import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataItem {
  id: number | string;
  [key: string]: unknown;
}

export interface DataState {
  items: DataItem[];
  isLoading: boolean;
  lastFetched: number | null;
}

const initialState: DataState = {
  items: [],
  isLoading: false,
  lastFetched: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DataItem[]>) => {
      state.items = action.payload;
      state.lastFetched = Date.now();
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
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setData, addDataItem, updateDataItem, removeDataItem, clearData, setLoading } =
  dataSlice.actions;

// Selectors
export const selectDataItems = (state: { data: DataState }) => state.data.items;
export const selectIsLoading = (state: { data: DataState }) => state.data.isLoading;
export const selectLastFetched = (state: { data: DataState }) => state.data.lastFetched;
export const selectDataItemById = (state: { data: DataState }, id: number | string) =>
  state.data.items.find(item => item.id === id);

export default dataSlice.reducer;
