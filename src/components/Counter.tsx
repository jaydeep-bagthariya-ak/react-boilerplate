import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { decrement, increment, reset } from '@/store/slices/counterSlice';

import './Counter.css';

export const Counter: React.FC = () => {
  const { t } = useTranslation();
  const count = useAppSelector(state => state.counter.value);
  const loading = useAppSelector(state => state.counter.loading);
  const dispatch = useAppDispatch();
  const [shouldThrowError, setShouldThrowError] = useState(false);

  // This will trigger during rendering, which ErrorBoundary can catch
  if (shouldThrowError) {
    throw new Error('This is a test error to demonstrate the ErrorBoundary!');
  }

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const handleError = () => {
    // Set state to trigger error during next render
    setShouldThrowError(true);
  };

  return (
    <div className="counter">
      <h2 className="counter__title">{t('counter', { count })}</h2>
      <div className="counter__display">
        <span className="counter__value">{count}</span>
      </div>
      <div className="counter__controls">
        <Button
          variant="secondary"
          onClick={handleDecrement}
          disabled={loading}
        >
          {t('buttons.decrement')}
        </Button>
        <Button variant="danger" onClick={handleReset} disabled={loading}>
          {t('buttons.reset')}
        </Button>
        <Button onClick={handleIncrement} disabled={loading}>
          {t('buttons.increment')}
        </Button>
        <Button
          variant="danger"
          onClick={handleError}
          style={{ marginTop: '1rem' }}
        >
          🔥 Trigger Error (Test ErrorBoundary)
        </Button>
      </div>
    </div>
  );
};
