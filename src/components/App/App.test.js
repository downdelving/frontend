import { render, screen } from '@testing-library/react';
import App from './App';

// Test that the App contains the Game component.
test('contains game component', () => {
  render(<App />);
  // Check for existence of the Game component.
  const gameElement = screen.getByTestId('game');
  expect(gameElement).toBeInTheDocument();
});
