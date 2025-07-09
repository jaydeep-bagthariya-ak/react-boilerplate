# Redux createAsyncThunk Implementation

This boilerplate now includes comprehensive examples of `createAsyncThunk` from Redux Toolkit for handling async operations in Redux.

## 📋 What's Included

### Async Slices

- **`postsSlice.ts`** - Complete async slice with multiple thunk examples
- **`usersSlice.ts`** - User management with async operations
- **Comprehensive error handling** - Proper TypeScript error handling
- **Loading states** - Granular loading states for different operations

### Components

- **`PostsPage.tsx`** - Updated to use Redux async thunks
- **`UsersPage.tsx`** - Demonstrates user data fetching
- **`AsyncThunkDemo.tsx`** - Comprehensive demo component showcasing all patterns

### Tests

- **`postsSlice.test.ts`** - Complete test suite for async thunks
- **Mock implementations** - Proper mocking of API services
- **Error scenarios** - Testing different error conditions

## 🚀 createAsyncThunk Features Demonstrated

### 1. Basic Async Operations

```typescript
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
```

### 2. Parameterized Async Thunks

```typescript
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
```

### 3. Multiple Loading States

```typescript
export interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  // Granular loading states
  fetchPostsLoading: boolean;
  fetchPostLoading: boolean;
  fetchPostsByUserLoading: boolean;
}
```

### 4. ExtraReducers Pattern

```typescript
extraReducers: builder => {
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
};
```

### 5. Typed Selectors

```typescript
export const selectPosts = (state: { posts: PostsState }) => state.posts.posts;
export const selectPostsLoading = (state: { posts: PostsState }) =>
  state.posts.loading;
export const selectPostsError = (state: { posts: PostsState }) =>
  state.posts.error;
```

### 6. Error Handling

```typescript
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  // Handle axios error structure
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    // ... proper type checking
  ) {
    return (error as { response: { data: { message: string } } }).response.data.message;
  }

  return 'An unknown error occurred';
};
```

## 🎯 Usage Examples

### In Components

```typescript
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  fetchPosts,
  selectPosts,
  selectFetchPostsLoading,
} from '../store/slices/postsSlice';

export const MyComponent = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectFetchPostsLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchPosts());
  };

  // ... render logic
};
```

### Multiple Concurrent Operations

```typescript
const handleFetchMultipleData = () => {
  // These will run concurrently
  dispatch(fetchPosts());
  dispatch(fetchUsers());
  dispatch(fetchPost(1));
};
```

### Conditional Dispatching

```typescript
const handleFetchPostsByUser = (userId: number) => {
  if (users.length > 0) {
    dispatch(fetchPostsByUser(userId));
  }
};
```

## 🧪 Testing Async Thunks

### Basic Test Structure

```typescript
describe('fetchPosts', () => {
  it('should handle successful posts fetching', async () => {
    // Arrange
    mockApiService.getPosts.mockResolvedValue(mockPosts);

    // Act
    const result = await store.dispatch(fetchPosts());

    // Assert
    expect(result.type).toBe('posts/fetchPosts/fulfilled');
    expect(result.payload).toEqual(mockPosts);
  });
});
```

### Testing Loading States

```typescript
it('should set loading state during request', async () => {
  let resolvePromise: (value: Post[]) => void;
  const promise = new Promise<Post[]>(resolve => {
    resolvePromise = resolve;
  });
  mockApiService.getPosts.mockReturnValue(promise);

  const dispatchPromise = store.dispatch(fetchPosts());

  // Assert loading state
  const loadingState = store.getState();
  expect(selectFetchPostsLoading(loadingState)).toBe(true);

  // Resolve and test final state
  resolvePromise!(mockPosts);
  await dispatchPromise;

  const finalState = store.getState();
  expect(selectFetchPostsLoading(finalState)).toBe(false);
});
```

## 🎨 Demo Component

The `AsyncThunkDemo` component (`src/components/AsyncThunkDemo.tsx`) provides a comprehensive interactive demonstration of all createAsyncThunk patterns:

1. **Fetch All Posts** - Basic async operation
2. **Fetch Single Post** - Parameterized thunk
3. **Fetch Posts by User** - Dependent operations
4. **Multiple Concurrent Operations** - Running multiple thunks
5. **Error Handling** - Comprehensive error states
6. **Loading States** - Granular loading indicators

## 📊 Benefits of This Implementation

### 1. **Type Safety**

- Full TypeScript integration
- Proper error type handling
- Type-safe selectors and actions

### 2. **Developer Experience**

- Redux DevTools integration
- Automatic action type generation
- Clear loading and error states

### 3. **Maintainability**

- Standardized error handling
- Reusable patterns
- Comprehensive testing

### 4. **Performance**

- Automatic request deduplication
- Efficient state updates
- Granular loading states

### 5. **Real-world Ready**

- Production-grade error handling
- Proper loading UX patterns
- Comprehensive test coverage

## 🔄 Migration from Local State

Before (local state):

```typescript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
  setLoading(true);
  try {
    const result = await api.getData();
    setData(result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

After (Redux createAsyncThunk):

```typescript
// In slice
export const fetchData = createAsyncThunk(/* ... */);

// In component
const data = useAppSelector(selectData);
const loading = useAppSelector(selectDataLoading);
const error = useAppSelector(selectDataError);

const handleFetch = () => dispatch(fetchData());
```

This implementation provides a solid foundation for any React application that needs robust async state management with Redux Toolkit.
