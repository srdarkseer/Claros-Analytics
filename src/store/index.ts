import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import filterReducer from './slices/filterSlice';
import paginationReducer from './slices/paginationSlice';
import errorReducer from './slices/errorSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    filter: filterReducer,
    pagination: paginationReducer,
    error: errorReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [],
        // Ignore these field paths in all actions
        ignoredActionPaths: [],
        // Ignore these paths in the state
        ignoredPaths: [],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
