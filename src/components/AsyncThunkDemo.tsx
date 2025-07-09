import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  fetchPosts,
  fetchPost,
  fetchPostsByUser,
  selectPosts,
  selectCurrentPost,
  selectPostsError,
  selectFetchPostsLoading,
  selectFetchPostLoading,
  selectFetchPostsByUserLoading,
  clearError,
  clearCurrentPost,
} from '../store/slices/postsSlice';
import {
  fetchUsers,
  selectUsers,
  selectFetchUsersLoading,
} from '../store/slices/usersSlice';

import { Button } from './ui/Button';

import './AsyncThunkDemo.css';

/**
 * AsyncThunkDemo Component
 *
 * This component demonstrates various createAsyncThunk patterns:
 * 1. Fetching all posts
 * 2. Fetching a specific post
 * 3. Fetching posts by user
 * 4. Multiple concurrent async operations
 * 5. Error handling and loading states
 * 6. Proper TypeScript integration
 */
export const AsyncThunkDemo = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Local state for user input
  const [selectedPostId, setSelectedPostId] = useState<number>(1);
  const [selectedUserId, setSelectedUserId] = useState<number>(1);

  // Redux state selectors
  const posts = useAppSelector(selectPosts);
  const currentPost = useAppSelector(selectCurrentPost);
  const users = useAppSelector(selectUsers);
  const error = useAppSelector(selectPostsError);

  // Loading states for different operations
  const isLoadingPosts = useAppSelector(selectFetchPostsLoading);
  const isLoadingPost = useAppSelector(selectFetchPostLoading);
  const isLoadingPostsByUser = useAppSelector(selectFetchPostsByUserLoading);
  const isLoadingUsers = useAppSelector(selectFetchUsersLoading);

  // Load users on component mount for the dropdown
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Async action handlers
  const handleFetchAllPosts = () => {
    dispatch(fetchPosts());
  };

  const handleFetchSinglePost = () => {
    dispatch(fetchPost(selectedPostId));
  };

  const handleFetchPostsByUser = () => {
    dispatch(fetchPostsByUser(selectedUserId));
  };

  const handleClearCurrentPost = () => {
    dispatch(clearCurrentPost());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  // Multiple concurrent operations example
  const handleFetchMultipleData = async () => {
    // This demonstrates how to dispatch multiple async thunks
    // They will run concurrently
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    dispatch(fetchPost(1));
  };

  return (
    <div className="async-thunk-demo">
      <div className="demo-container">
        <header className="demo-header">
          <h1 className="demo-title">
            {t('demo.title', 'createAsyncThunk Demo')}
          </h1>
          <p className="demo-description">
            {t(
              'demo.description',
              'Demonstrating various patterns with Redux Toolkit createAsyncThunk'
            )}
          </p>
        </header>

        {/* Global Error Display */}
        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <Button onClick={handleClearError} variant="secondary" size="small">
              {t('demo.clearError', 'Clear Error')}
            </Button>
          </div>
        )}

        <div className="demo-sections">
          {/* Section 1: Fetch All Posts */}
          <section className="demo-section">
            <h2 className="section-title">
              {t('demo.fetchAllPosts', '1. Fetch All Posts')}
            </h2>
            <div className="section-controls">
              <Button
                onClick={handleFetchAllPosts}
                disabled={isLoadingPosts}
                loading={isLoadingPosts}
              >
                {isLoadingPosts
                  ? t('demo.loading', 'Loading...')
                  : t('demo.fetchPosts', 'Fetch Posts')}
              </Button>
              <span className="result-count">
                {t('demo.postsCount', 'Posts loaded: {{count}}', {
                  count: posts.length,
                })}
              </span>
            </div>
          </section>

          {/* Section 2: Fetch Single Post */}
          <section className="demo-section">
            <h2 className="section-title">
              {t('demo.fetchSinglePost', '2. Fetch Single Post')}
            </h2>
            <div className="section-controls">
              <div className="input-group">
                <label htmlFor="postId">{t('demo.postId', 'Post ID:')}</label>
                <input
                  id="postId"
                  type="number"
                  min="1"
                  max="100"
                  value={selectedPostId}
                  onChange={e => setSelectedPostId(Number(e.target.value))}
                  className="number-input"
                />
              </div>
              <Button
                onClick={handleFetchSinglePost}
                disabled={isLoadingPost}
                loading={isLoadingPost}
              >
                {t('demo.fetchPost', 'Fetch Post')}
              </Button>
              {currentPost && (
                <Button
                  onClick={handleClearCurrentPost}
                  variant="secondary"
                  size="small"
                >
                  {t('demo.clearPost', 'Clear')}
                </Button>
              )}
            </div>

            {/* Current Post Display */}
            {currentPost && (
              <div className="current-post">
                <h3>{currentPost.title}</h3>
                <p>{currentPost.body}</p>
                <small>
                  {t('demo.postMeta', 'Post #{{id}} by User #{{userId}}', {
                    id: currentPost.id,
                    userId: currentPost.userId,
                  })}
                </small>
              </div>
            )}
          </section>

          {/* Section 3: Fetch Posts by User */}
          <section className="demo-section">
            <h2 className="section-title">
              {t('demo.fetchPostsByUser', '3. Fetch Posts by User')}
            </h2>
            <div className="section-controls">
              <div className="input-group">
                <label htmlFor="userId">
                  {t('demo.selectUser', 'Select User:')}
                </label>
                <select
                  id="userId"
                  value={selectedUserId}
                  onChange={e => setSelectedUserId(Number(e.target.value))}
                  className="user-select"
                  disabled={isLoadingUsers}
                >
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} (@{user.username})
                    </option>
                  ))}
                </select>
              </div>
              <Button
                onClick={handleFetchPostsByUser}
                disabled={isLoadingPostsByUser || users.length === 0}
                loading={isLoadingPostsByUser}
              >
                {t('demo.fetchUserPosts', 'Fetch User Posts')}
              </Button>
            </div>
          </section>

          {/* Section 4: Multiple Concurrent Operations */}
          <section className="demo-section">
            <h2 className="section-title">
              {t('demo.concurrentOps', '4. Multiple Concurrent Operations')}
            </h2>
            <div className="section-controls">
              <Button
                onClick={handleFetchMultipleData}
                disabled={isLoadingPosts || isLoadingUsers || isLoadingPost}
              >
                {t('demo.fetchAll', 'Fetch Posts + Users + Single Post')}
              </Button>
              <div className="loading-indicators">
                {isLoadingPosts && (
                  <span className="loading-tag">
                    {t('demo.loadingPosts', 'Loading Posts...')}
                  </span>
                )}
                {isLoadingUsers && (
                  <span className="loading-tag">
                    {t('demo.loadingUsers', 'Loading Users...')}
                  </span>
                )}
                {isLoadingPost && (
                  <span className="loading-tag">
                    {t('demo.loadingPost', 'Loading Post...')}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Results Summary */}
          <section className="demo-section">
            <h2 className="section-title">
              {t('demo.summary', 'Data Summary')}
            </h2>
            <div className="summary-grid">
              <div className="summary-item">
                <strong>{t('demo.totalPosts', 'Total Posts:')}</strong>
                <span>{posts.length}</span>
              </div>
              <div className="summary-item">
                <strong>{t('demo.totalUsers', 'Total Users:')}</strong>
                <span>{users.length}</span>
              </div>
              <div className="summary-item">
                <strong>{t('demo.currentPost', 'Current Post:')}</strong>
                <span>
                  {currentPost ? `#${currentPost.id}` : t('demo.none', 'None')}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
