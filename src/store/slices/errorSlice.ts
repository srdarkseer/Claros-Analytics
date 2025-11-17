import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ErrorState {
  message: string | null;
  code: string | number | null;
  hasError: boolean;
}

const initialState: ErrorState = {
  message: null,
  code: null,
  hasError: false,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<{ message: string; code?: string | number }>) => {
      state.message = action.payload.message;
      state.code = action.payload.code || null;
      state.hasError = true;
    },
    clearError: state => {
      state.message = null;
      state.code = null;
      state.hasError = false;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

// Selectors
export const selectErrorMessage = (state: { error: ErrorState }) => state.error.message;
export const selectErrorCode = (state: { error: ErrorState }) => state.error.code;
export const selectHasError = (state: { error: ErrorState }) => state.error.hasError;

export default errorSlice.reducer;
