import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './slices/counterSlice';
import postsSlice from './slices/postsSlice';
import usersSlice from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    posts: postsSlice,
    users: usersSlice,
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
