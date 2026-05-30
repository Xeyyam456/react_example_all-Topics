import { render, screen, act } from '@testing-library/react';
import CountDown from './CountDown';

describe('CountDown komponenti', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('başlanğıcda 15 göstərir', () => {
    render(<CountDown />);
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  test('"Geri sayım" label-i görünür', () => {
    render(<CountDown />);
    expect(screen.getByText('Geri sayım')).toBeInTheDocument();
  });

  test('1 saniyə sonra 14 göstərir', () => {
    render(<CountDown />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('14')).toBeInTheDocument();
  });

  test('5-ə çatdıqda "Az qaldı!" xəbərdarlığı göstərir', () => {
    render(<CountDown />);
    act(() => {
      vi.advanceTimersByTime(10000); // 15 - 10 = 5
    });
    expect(screen.getByText('Az qaldı!')).toBeInTheDocument();
  });

  test('0-a çatdıqda "Vaxt bitdi!" mesajı göstərir', () => {
    render(<CountDown />);
    act(() => {
      vi.advanceTimersByTime(15000);
    });
    expect(screen.getByText('Vaxt bitdi!')).toBeInTheDocument();
  });

  test('0-a çatdıqda sayı göstərmir', () => {
    render(<CountDown />);
    act(() => {
      vi.advanceTimersByTime(15000);
    });
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });
});
