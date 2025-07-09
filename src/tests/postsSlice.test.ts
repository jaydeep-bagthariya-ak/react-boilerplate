import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { apiService } from '../services/api';
import postsReducer, {
  fetchPosts,
  fetchPost,
  fetchPostsByUser,
  selectPosts,
  selectPostsError,
  selectFetchPostsLoading,
} from '../store/slices/postsSlice';
import type { Post } from '../types';

// Mock the API service
vi.mock('../services/api', () => ({
  apiService: {
    getPosts: vi.fn(),
    getPost: vi.fn(),
    getPostsByUser: vi.fn(),
  },
}));

const mockApiService = vi.mocked(apiService);

// Mock data
const mockPosts: Post[] = [
  {
    id: 1,
    userId: 1,
    title: 'Test Post 1',
    body: 'This is a test post body',
  },
  {
    id: 2,
    userId: 1,
    title: 'Test Post 2',
    body: 'This is another test post body',
  },
];

const mockPost: Post = {
  id: 1,
  userId: 1,
  title: 'Test Post',
  body: 'This is a test post body',
};

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
    },
  });
};

describe('postsSlice async thunks', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  describe('fetchPosts', () => {
    it('should handle successful posts fetching', async () => {
      // Arrange
      mockApiService.getPosts.mockResolvedValue(mockPosts);

      // Act
      const result = await store.dispatch(fetchPosts());

      // Assert
      expect(result.type).toBe('posts/fetchPosts/fulfilled');
      expect(result.payload).toEqual(mockPosts);

      const state = store.getState();
      expect(selectPosts(state)).toEqual(mockPosts);
      expect(selectFetchPostsLoading(state)).toBe(false);
      expect(selectPostsError(state)).toBeNull();
    });

    it('should handle failed posts fetching', async () => {
      // Arrange
      const errorMessage = 'Network error';
      mockApiService.getPosts.mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await store.dispatch(fetchPosts());

      // Assert
      expect(result.type).toBe('posts/fetchPosts/rejected');
      expect(result.payload).toBe(errorMessage);

      const state = store.getState();
      expect(selectPosts(state)).toEqual([]);
      expect(selectFetchPostsLoading(state)).toBe(false);
      expect(selectPostsError(state)).toBe(errorMessage);
    });

    it('should set loading state during request', async () => {
      // Arrange
      let resolvePromise: (value: Post[]) => void;
      const promise = new Promise<Post[]>(resolve => {
        resolvePromise = resolve;
      });
      mockApiService.getPosts.mockReturnValue(promise);

      // Act
      const dispatchPromise = store.dispatch(fetchPosts());

      // Assert loading state
      const loadingState = store.getState();
      expect(selectFetchPostsLoading(loadingState)).toBe(true);

      // Resolve the promise
      resolvePromise!(mockPosts);
      await dispatchPromise;

      // Assert final state
      const finalState = store.getState();
      expect(selectFetchPostsLoading(finalState)).toBe(false);
    });
  });

  describe('fetchPost', () => {
    it('should handle successful single post fetching', async () => {
      // Arrange
      mockApiService.getPost.mockResolvedValue(mockPost);

      // Act
      const result = await store.dispatch(fetchPost(1));

      // Assert
      expect(result.type).toBe('posts/fetchPost/fulfilled');
      expect(result.payload).toEqual(mockPost);

      const state = store.getState();
      expect(state.posts.currentPost).toEqual(mockPost);
      expect(state.posts.fetchPostLoading).toBe(false);
      expect(state.posts.error).toBeNull();
    });

    it('should handle failed single post fetching', async () => {
      // Arrange
      const errorMessage = 'Post not found';
      mockApiService.getPost.mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await store.dispatch(fetchPost(999));

      // Assert
      expect(result.type).toBe('posts/fetchPost/rejected');
      expect(result.payload).toBe(errorMessage);

      const state = store.getState();
      expect(state.posts.currentPost).toBeNull();
      expect(state.posts.fetchPostLoading).toBe(false);
      expect(state.posts.error).toBe(errorMessage);
    });
  });

  describe('fetchPostsByUser', () => {
    it('should handle successful user posts fetching', async () => {
      // Arrange
      const userPosts = mockPosts.filter(post => post.userId === 1);
      mockApiService.getPostsByUser.mockResolvedValue(userPosts);

      // Act
      const result = await store.dispatch(fetchPostsByUser(1));

      // Assert
      expect(result.type).toBe('posts/fetchPostsByUser/fulfilled');
      expect(result.payload).toEqual(userPosts);

      const state = store.getState();
      expect(selectPosts(state)).toEqual(userPosts);
      expect(state.posts.fetchPostsByUserLoading).toBe(false);
      expect(selectPostsError(state)).toBeNull();
    });

    it('should handle axios error with response data', async () => {
      // Arrange
      const axiosError = {
        response: {
          data: {
            message: 'User not found',
          },
        },
      };
      mockApiService.getPostsByUser.mockRejectedValue(axiosError);

      // Act
      const result = await store.dispatch(fetchPostsByUser(999));

      // Assert
      expect(result.type).toBe('posts/fetchPostsByUser/rejected');
      expect(result.payload).toBe('User not found');
    });
  });

  describe('error handling', () => {
    it('should handle different error types correctly', async () => {
      // Test regular Error
      mockApiService.getPosts.mockRejectedValue(new Error('Regular error'));
      let result = await store.dispatch(fetchPosts());
      expect(result.payload).toBe('Regular error');

      // Test axios-like error
      const axiosError = {
        response: {
          data: {
            message: 'Axios error message',
          },
        },
      };
      mockApiService.getPosts.mockRejectedValue(axiosError);
      result = await store.dispatch(fetchPosts());
      expect(result.payload).toBe('Axios error message');

      // Test unknown error
      mockApiService.getPosts.mockRejectedValue('Unknown error');
      result = await store.dispatch(fetchPosts());
      expect(result.payload).toBe('An unknown error occurred');
    });
  });

  describe('state management', () => {
    it('should update posts array when fetching single post that exists in array', async () => {
      // First, add posts to the state
      mockApiService.getPosts.mockResolvedValue(mockPosts);
      await store.dispatch(fetchPosts());

      // Then fetch a single post with updated data
      const updatedPost = { ...mockPost, title: 'Updated Title' };
      mockApiService.getPost.mockResolvedValue(updatedPost);
      await store.dispatch(fetchPost(1));

      const state = store.getState();
      const postsInState = selectPosts(state);

      // The post in the array should be updated
      expect(postsInState.find(p => p.id === 1)?.title).toBe('Updated Title');
      expect(state.posts.currentPost?.title).toBe('Updated Title');
    });
  });
});
