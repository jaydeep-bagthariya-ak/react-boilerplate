import { describe, expect, it } from 'vitest';

import { AppContent } from '../App';

import { render, screen } from './test-utils';

describe('App', () => {
  it('renders welcome message', () => {
    render(<AppContent />);
    expect(
      screen.getByText('Welcome to React Boilerplate')
    ).toBeInTheDocument();
  });

  it('renders counter component', () => {
    render(<AppContent />);
    expect(screen.getByText(/Count is/)).toBeInTheDocument();
  });

  it('renders language switcher button', () => {
    render(<AppContent />);
    // Look for the button by its class or content that we know will be there
    expect(
      screen.getByRole('button', { name: /Switch Language/ })
    ).toBeInTheDocument();
  });
});
