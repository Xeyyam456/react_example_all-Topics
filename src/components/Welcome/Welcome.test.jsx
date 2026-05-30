import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';

describe('Welcome komponenti', () => {
  test('başlıq mətnini render edir', () => {
    render(<Welcome />);
    expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument();
  });

  test('subtitle mətnini render edir', () => {
    render(<Welcome />);
    expect(screen.getByText(/where would you like to go/i)).toBeInTheDocument();
  });
});
