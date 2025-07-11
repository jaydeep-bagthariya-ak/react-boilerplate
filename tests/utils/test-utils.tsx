/* eslint-disable react-refresh/only-export-components */
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../../src/store';

import { defaultTestI18n, createTestI18n } from './i18n-utils';
import type { SupportedLanguage } from './i18n-utils';

interface AllTheProvidersProps {
  children: React.ReactNode;
  initialEntries?: string[];
  language?: SupportedLanguage;
}

function AllTheProviders({
  children,
  initialEntries = ['/'],
  language = 'en',
}: AllTheProvidersProps) {
  const i18nInstance =
    language === 'en' ? defaultTestI18n : createTestI18n(language);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </I18nextProvider>
    </Provider>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    initialEntries?: string[];
    language?: SupportedLanguage;
  }
) => {
  const { initialEntries, language, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders initialEntries={initialEntries} language={language}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render };
