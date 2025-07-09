import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../components/ui/Button';
import { apiService } from '../services/api';
import type { Post } from '../types';

export const PostsPage = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedPosts = await apiService.getPosts();
      // Limit to first 10 posts for better UX
      setPosts(fetchedPosts.slice(0, 10));
    } catch (err) {
      setError(t('posts.error', 'Failed to fetch posts'));
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="page">
      <div className="page__container">
        <header className="page__header">
          <h1 className="page__title">{t('posts.title', 'Posts')}</h1>
          <p className="page__description">
            {t('posts.description', 'Latest posts from JSONPlaceholder API')}
          </p>
          <Button onClick={fetchPosts} disabled={loading}>
            {loading
              ? t('posts.loading', 'Loading...')
              : t('posts.refresh', 'Refresh')}
          </Button>
        </header>

        <main className="page__content">
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <Button onClick={fetchPosts} variant="secondary">
                {t('posts.retry', 'Try Again')}
              </Button>
            </div>
          )}

          {loading && !posts.length && (
            <div className="loading-spinner">
              <p>{t('posts.loading', 'Loading...')}</p>
            </div>
          )}

          {posts.length > 0 && (
            <div className="posts-list">
              {posts.map(post => (
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
        </main>
      </div>
    </div>
  );
};
