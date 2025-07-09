import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { apiService } from '../../services/api';
import type { Post } from '../../types';

// Define the state interface
export interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  // Track different loading states for different operations
  fetchPostsLoading: boolean;
  fetchPostLoading: boolean;
  fetchPostsByUserLoading: boolean;
}

// Initial state
const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  fetchPostsLoading: false,
  fetchPostLoading: false,
  fetchPostsByUserLoading: false,
};

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

// Async thunk actions
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const posts = await apiService.getPosts();
      return posts;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error) || 'Failed to fetch posts');
    }
  }
);

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (postId: number, { rejectWithValue }) => {
    try {
      const post = await apiService.getPost(postId);
      return post;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error) || 'Failed to fetch post');
    }
  }
);

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchPostsByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      const posts = await apiService.getPostsByUser(userId);
      return posts;
    } catch (error: unknown) {
      return rejectWithValue(
        getErrorMessage(error) || 'Failed to fetch user posts'
      );
    }
  }
);

// Create the slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Synchronous reducers
    clearCurrentPost: state => {
      state.currentPost = null;
    },
    clearError: state => {
      state.error = null;
    },
    clearPosts: state => {
      state.posts = [];
    },
    // Example of a reducer that can be used with local state updates
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(
        post => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      if (state.currentPost?.id === action.payload.id) {
        state.currentPost = action.payload;
      }
    },
  },
  extraReducers: builder => {
    // Handle fetchPosts
    builder
      .addCase(fetchPosts.pending, state => {
        state.fetchPostsLoading = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.fetchPostsLoading = false;
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchPostsLoading = false;
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle fetchPost
    builder
      .addCase(fetchPost.pending, state => {
        state.fetchPostLoading = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.fetchPostLoading = false;
        state.loading = false;
        state.currentPost = action.payload;
        state.error = null;

        // Also update the post in the posts array if it exists
        const index = state.posts.findIndex(
          post => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.fetchPostLoading = false;
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle fetchPostsByUser
    builder
      .addCase(fetchPostsByUser.pending, state => {
        state.fetchPostsByUserLoading = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.fetchPostsByUserLoading = false;
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.fetchPostsByUserLoading = false;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearCurrentPost, clearError, clearPosts, updatePost } =
  postsSlice.actions;

// Export selectors
export const selectPosts = (state: { posts: PostsState }) => state.posts.posts;

export const selectCurrentPost = (state: { posts: PostsState }) =>
  state.posts.currentPost;

export const selectPostsLoading = (state: { posts: PostsState }) =>
  state.posts.loading;

export const selectPostsError = (state: { posts: PostsState }) =>
  state.posts.error;

export const selectFetchPostsLoading = (state: { posts: PostsState }) =>
  state.posts.fetchPostsLoading;

export const selectFetchPostLoading = (state: { posts: PostsState }) =>
  state.posts.fetchPostLoading;

export const selectFetchPostsByUserLoading = (state: { posts: PostsState }) =>
  state.posts.fetchPostsByUserLoading;

// Export reducer
export default postsSlice.reducer;
