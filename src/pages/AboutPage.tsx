import { useTranslation } from 'react-i18next';

export const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page">
      <div className="page__container">
        <header className="page__header">
          <h1 className="page__title">{t('about.title', 'About')}</h1>
        </header>

        <main className="page__content">
          <div className="about__content">
            <p className="about__description">
              {t(
                'about.description',
                'This is a modern React TypeScript boilerplate with the following features:'
              )}
            </p>

            <ul className="about__features">
              <li>React 18 with TypeScript</li>
              <li>Vite for build tooling</li>
              <li>Redux Toolkit for state management</li>
              <li>React Router for navigation</li>
              <li>React i18next for internationalization</li>
              <li>Axios for HTTP requests</li>
              <li>Vitest + Testing Library for testing</li>
              <li>ESLint + Prettier for code quality</li>
            </ul>

            <div className="about__tech-stack">
              <h2>{t('about.techStack', 'Tech Stack')}</h2>
              <div className="tech-stack__grid">
                <div className="tech-stack__item">
                  <h3>Frontend</h3>
                  <p>React 18, TypeScript, CSS3</p>
                </div>
                <div className="tech-stack__item">
                  <h3>State Management</h3>
                  <p>Redux Toolkit</p>
                </div>
                <div className="tech-stack__item">
                  <h3>Build Tool</h3>
                  <p>Vite</p>
                </div>
                <div className="tech-stack__item">
                  <h3>Testing</h3>
                  <p>Vitest, Testing Library</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
