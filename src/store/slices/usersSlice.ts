import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiService } from '../../services/api';
import type { User } from '../../types';

// Helper function to extract error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  // Handle axios error structure
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as { response?: { data?: { message?: string } } })
      .response === 'object' &&
    (error as { response?: { data?: { message?: string } } }).response?.data
      ?.message
  ) {
    return (error as { response: { data: { message: string } } }).response.data
      .message;
  }

  return 'An unknown error occurred';
};

// Define the state interface
export interface UsersState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  fetchUsersLoading: boolean;
  fetchUserLoading: boolean;
}

// Initial state
const initialState: UsersState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  fetchUsersLoading: false,
  fetchUserLoading: false,
};

// Async thunk actions
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await apiService.getUsers();
      return users;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error) || 'Failed to fetch users');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      const user = await apiService.getUser(userId);
      return user;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error) || 'Failed to fetch user');
    }
  }
);

// Create the slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearCurrentUser: state => {
      state.currentUser = null;
    },
    clearError: state => {
      state.error = null;
    },
    clearUsers: state => {
      state.users = [];
    },
  },
  extraReducers: builder => {
    // Handle fetchUsers
    builder
      .addCase(fetchUsers.pending, state => {
        state.fetchUsersLoading = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetchUsersLoading = false;
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.fetchUsersLoading = false;
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle fetchUser
    builder
      .addCase(fetchUser.pending, state => {
        state.fetchUserLoading = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchUserLoading = false;
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;

        // Also update the user in the users array if it exists
        const index = state.users.findIndex(
          user => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchUserLoading = false;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearCurrentUser, clearError, clearUsers } = usersSlice.actions;

// Export selectors
export const selectUsers = (state: { users: UsersState }) => state.users.users;

export const selectCurrentUser = (state: { users: UsersState }) =>
  state.users.currentUser;

export const selectUsersLoading = (state: { users: UsersState }) =>
  state.users.loading;

export const selectUsersError = (state: { users: UsersState }) =>
  state.users.error;

export const selectFetchUsersLoading = (state: { users: UsersState }) =>
  state.users.fetchUsersLoading;

export const selectFetchUserLoading = (state: { users: UsersState }) =>
  state.users.fetchUserLoading;

// Export reducer
export default usersSlice.reducer;
