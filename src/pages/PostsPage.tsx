import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../components/ui/Button';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  fetchPosts,
  selectPosts,
  selectPostsError,
  selectFetchPostsLoading,
  clearError,
} from '../store/slices/postsSlice';

export const PostsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Get state from Redux store
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectFetchPostsLoading);
  const error = useAppSelector(selectPostsError);

  // Fetch posts on component mount
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchPosts());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="page">
      <div className="page__container">
        <header className="page__header">
          <h1 className="page__title">{t('posts.title', 'Posts')}</h1>
          <p className="page__description">
            {t(
              'posts.description',
              'Latest posts from JSONPlaceholder API using Redux createAsyncThunk'
            )}
          </p>
          <Button onClick={handleRefresh} disabled={loading}>
            {loading
              ? t('posts.loading', 'Loading...')
              : t('posts.refresh', 'Refresh')}
          </Button>
        </header>

        <main className="page__content">
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <div>
                <Button onClick={handleRefresh} variant="secondary">
                  {t('posts.retry', 'Try Again')}
                </Button>
                <Button
                  onClick={handleClearError}
                  variant="secondary"
                  style={{ marginLeft: '8px' }}
                >
                  {t('posts.clearError', 'Clear Error')}
                </Button>
              </div>
            </div>
          )}

          {loading && !posts.length && (
            <div className="loading-spinner">
              <p>{t('posts.loading', 'Loading...')}</p>
            </div>
          )}

          {posts.length > 0 && (
            <div className="posts-list">
              {posts.slice(0, 10).map(post => (
                <article key={post.id} className="post-card">
                  <header className="post-card__header">
                    <h2 className="post-card__title">{post.title}</h2>
                    <span className="post-card__meta">
                      {t('posts.postId', 'Post #{{id}}', { id: post.id })} •{' '}
                      {t('posts.userId', 'User #{{userId}}', {
                        userId: post.userId,
                      })}
                    </span>
                  </header>

                  <div className="post-card__content">
                    <p className="post-card__body">{post.body}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="empty-state">
              <p>{t('posts.empty', 'No posts found')}</p>
              <Button onClick={handleRefresh}>
                {t('posts.retry', 'Try Again')}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
