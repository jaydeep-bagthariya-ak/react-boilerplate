import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AppContent } from '../App';

// Test WITHOUT test-utils.tsx
describe('App without test-utils', () => {
  it('fails without proper providers', () => {
    render(<AppContent />);
    expect(
      screen.getByText('Welcome to React Boilerplate')
    ).toBeInTheDocument();
  });
});
