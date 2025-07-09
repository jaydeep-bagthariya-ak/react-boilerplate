import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../components/ui/Button';
import { apiService } from '../services/api';
import type { User } from '../types';

export const UsersPage = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    console.log('Fetching users...');
    setLoading(true);
    setError(null);

    try {
      const fetchedUsers = await apiService.getUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(t('users.error', 'Failed to fetch users'));
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="page">
      <div className="page__container">
        <header className="page__header">
          <h1 className="page__title">{t('users.title', 'Users')}</h1>
          <p className="page__description">
            {t('users.description', 'List of users from JSONPlaceholder API')}
          </p>
          <Button onClick={fetchUsers} disabled={loading}>
            {loading
              ? t('users.loading', 'Loading...')
              : t('users.refresh', 'Refresh')}
          </Button>
        </header>

        <main className="page__content">
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <Button onClick={fetchUsers} variant="secondary">
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
