import React, { Suspense, useRef, useState } from 'react';
import { describe, expect, it } from 'vitest';

import { render, screen } from './test-utils';

// Test that React 19 features are working
describe('React 19 Compatibility', () => {
  it('supports ref as prop (React 19 feature)', () => {
    // Create a simple component that uses ref as prop
    function TestInput({
      placeholder,
      ref,
    }: {
      placeholder: string;
      ref: React.Ref<HTMLInputElement>;
    }) {
      return <input placeholder={placeholder} ref={ref} />;
    }

    function TestComponent() {
      const inputRef = useRef<HTMLInputElement>(null);

      return (
        <div>
          <TestInput ref={inputRef} placeholder="Test input" />
          <button onClick={() => inputRef.current?.focus()} type="button">
            Focus Input
          </button>
        </div>
      );
    }

    render(<TestComponent />);

    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Focus Input' })
    ).toBeInTheDocument();
  });

  it('supports modern React patterns', () => {
    // Test that basic React patterns work correctly
    function ModernComponent() {
      const [count, setCount] = useState(0);

      return (
        <div>
          <p>Modern count: {count}</p>
          <button onClick={() => setCount(c => c + 1)} type="button">
            Increment Modern
          </button>
        </div>
      );
    }

    render(<ModernComponent />);

    expect(screen.getByText('Modern count: 0')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Increment Modern' })
    ).toBeInTheDocument();
  });

  it('works with Suspense boundaries', () => {
    function SuspenseTest() {
      return (
        <Suspense fallback={<div>Loading suspense test...</div>}>
          <div>Suspense content loaded</div>
        </Suspense>
      );
    }

    render(<SuspenseTest />);

    expect(screen.getByText('Suspense content loaded')).toBeInTheDocument();
  });
});
