import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../components/ui/Button';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  fetchUsers,
  selectUsers,
  selectUsersError,
  selectFetchUsersLoading,
  clearError,
} from '../store/slices/usersSlice';

export const UsersPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Get state from Redux store
  const users = useAppSelector(selectUsers);
  const loading = useAppSelector(selectFetchUsersLoading);
  const error = useAppSelector(selectUsersError);

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="page">
      <div className="page__container">
        <header className="page__header">
          <h1 className="page__title">{t('users.title', 'Users')}</h1>
          <p className="page__description">
            {t(
              'users.description',
              'List of users from JSONPlaceholder API using Redux createAsyncThunk'
            )}
          </p>
          <Button onClick={handleRefresh} disabled={loading}>
            {loading
              ? t('users.loading', 'Loading...')
              : t('users.refresh', 'Refresh')}
          </Button>
        </header>

        <main className="page__content">
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <div>
                <Button onClick={handleRefresh} variant="secondary">
                  {t('users.retry', 'Try Again')}
                </Button>
                <Button
                  onClick={handleClearError}
                  variant="secondary"
                  style={{ marginLeft: '8px' }}
                >
                  {t('users.clearError', 'Clear Error')}
                </Button>
              </div>
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <div className="empty-state">
              <p>{t('users.empty', 'No users found')}</p>
              <Button onClick={handleRefresh}>
                {t('users.retry', 'Try Again')}
              </Button>
            </div>
          )}

          {loading && !users.length && (
            <div className="loading-spinner">
              <p>{t('users.loading', 'Loading...')}</p>
            </div>
          )}

          {users.length > 0 && (
            <div className="users-grid">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-card__header">
                    <h3 className="user-card__name">{user.name}</h3>
                    <span className="user-card__username">
                      @{user.username}
                    </span>
                  </div>

                  <div className="user-card__content">
                    <p className="user-card__email">
                      <strong>{t('users.email', 'Email')}:</strong> {user.email}
                    </p>
                    <p className="user-card__phone">
                      <strong>{t('users.phone', 'Phone')}:</strong> {user.phone}
                    </p>
                    <p className="user-card__website">
                      <strong>{t('users.website', 'Website')}:</strong>{' '}
                      <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="user-card__link"
                      >
                        {user.website}
                      </a>
                    </p>
                  </div>

                  <div className="user-card__footer">
                    <div className="user-card__company">
                      <strong>{t('users.company', 'Company')}:</strong>{' '}
                      {user.company.name}
                    </div>
                    <div className="user-card__address">
                      <strong>{t('users.city', 'City')}:</strong>{' '}
                      {user.address.city}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
