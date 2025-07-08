import { useTranslation } from 'react-i18next';

import { Counter } from './components/Counter';
import { LanguageSwitcher } from './components/LanguageSwitcher';

import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">{t('welcome')}</h1>
        <p className="app__description">{t('description')}</p>
      </header>

      <main className="app__main">
        <Counter />
        <LanguageSwitcher />
      </main>

      <footer className="app__footer">
        <p>
          Built with React 18 + TypeScript + Vite + Redux Toolkit + i18n +
          Vitest
        </p>
      </footer>
    </div>
  );
}

export default App;
