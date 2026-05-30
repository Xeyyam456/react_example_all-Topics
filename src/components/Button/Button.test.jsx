import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button komponenti', () => {
  test('children mətnini render edir', () => {
    render(<Button>Klik et</Button>);
    expect(screen.getByRole('button', { name: 'Klik et' })).toBeInTheDocument();
  });

  test('onClick funksiyasını çağırır', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Sil</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disabled olduqda onClick işləmir', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Sil</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('disabled atributu tətbiq olunur', () => {
    render(<Button disabled>Saxla</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('default type="button" olur', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  test('type="submit" göndərildikdə tətbiq olunur', () => {
    render(<Button type="submit">Göndər</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
