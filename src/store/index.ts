import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
