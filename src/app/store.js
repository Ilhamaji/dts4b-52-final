import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/NewsSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});
