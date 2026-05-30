import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Calculator Home komponenti react-router-dom-a ehtiyac duyur
const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('Calculator Home komponenti', () => {
  test('başlıq render olunur', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Kalkulyator')).toBeInTheDocument();
  });

  test('iki input sahəsi var', () => {
    renderWithRouter(<Home />);
    const inputs = screen.getAllByRole('spinbutton'); // type="number"
    expect(inputs).toHaveLength(2);
  });

  test('4 əməliyyat düyməsi var', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText('Toplama')).toBeInTheDocument();
    expect(screen.getByText('Çıxma')).toBeInTheDocument();
    expect(screen.getByText('Vurma')).toBeInTheDocument();
    expect(screen.getByText('Bölmə')).toBeInTheDocument();
  });

  test('rəqəm daxil edilmədikdə xəbərdarlıq göstərir', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/hər iki ədədi daxil edin/i)).toBeInTheDocument();
  });

  test('hər iki input doldurulduqda xəbərdarlıq yox olur', () => {
    renderWithRouter(<Home />);
    const [input1, input2] = screen.getAllByRole('spinbutton');
    fireEvent.change(input1, { target: { value: '5' } });
    fireEvent.change(input2, { target: { value: '3' } });
    expect(screen.queryByText(/hər iki ədədi daxil edin/i)).not.toBeInTheDocument();
  });
});
