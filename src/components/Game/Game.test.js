import { render, screen } from '@testing-library/react';
import Game from './Game';

// Test that the Game component renders.
test('renders world component', () => {
  render(<Game />);
  // Check for existence of the world element.
  const worldElement = screen.getByTestId('world');
  expect(worldElement).toBeInTheDocument();
});
