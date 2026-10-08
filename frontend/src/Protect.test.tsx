import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Protect from './pages/Protect';

describe('Protect page', () => {
  test('renders primary UI components', () => {
    render(
      <MemoryRouter>
        <Protect />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /protect image/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/owner name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/copyright id/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/secret key/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /protect image/i })).toBeInTheDocument();
  });
});
