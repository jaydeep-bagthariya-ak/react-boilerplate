import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LanguageSwitcher } from './LanguageSwitcher';
import './Header.css';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <h1 className="header__title">{t('appName', 'React Boilerplate')}</h1>
        </Link>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/" className="header__nav-link">
                {t('nav.home', 'Home')}
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/users" className="header__nav-link">
                {t('nav.users', 'Users')}
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/posts" className="header__nav-link">
                {t('nav.posts', 'Posts')}
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/about" className="header__nav-link">
                {t('nav.about', 'About')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
