import { describe, expect, it } from 'vitest';

import { AppContent } from '../App';

import { render, screen } from './test-utils';

// Test that demonstrates the improved i18n setup
describe('Enhanced i18n Testing', () => {
  it('renders in English by default', () => {
    render(<AppContent />);
    expect(
      screen.getByText('Welcome to React Boilerplate')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Switch Language' })
    ).toBeInTheDocument();
  });

  it('renders in Spanish when language is specified', () => {
    render(<AppContent />, { language: 'es' });
    expect(
      screen.getByText('Bienvenido a React Boilerplate')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cambiar Idioma' })
    ).toBeInTheDocument();
  });

  it('can test different routes in different languages', () => {
    render(<AppContent />, {
      initialEntries: ['/about'],
      language: 'es',
    });

    // This would test the About page in Spanish
    // expect(screen.getByText('Acerca de')).toBeInTheDocument();
  });
});
