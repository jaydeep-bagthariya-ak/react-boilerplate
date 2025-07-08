import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import App from '../App';
import { store } from '../store';

import '../i18n';

const AppWithProviders = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

describe('App', () => {
  it('renders welcome message', () => {
    render(<AppWithProviders />);
    expect(
      screen.getByText('Welcome to React Boilerplate')
    ).toBeInTheDocument();
  });

  it('renders counter component', () => {
    render(<AppWithProviders />);
    expect(screen.getByText(/Count is/)).toBeInTheDocument();
  });

  it('renders language switcher button', () => {
    render(<AppWithProviders />);
    // Look for the button by its class or content that we know will be there
    expect(
      screen.getByRole('button', { name: /language\.switch/ })
    ).toBeInTheDocument();
  });
});
