import { useTranslation } from 'react-i18next';

import { Counter } from '../components/Counter';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="page">
      <div className="page__container">
        <header className="page__header">
          <h1 className="page__title">{t('welcome')}</h1>
          <p className="page__description">{t('description')}</p>
        </header>

        <main className="page__content">
          <Counter />
        </main>
      </div>
    </div>
  );
};
