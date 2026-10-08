import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import Verify from "./pages/Verify";

describe('Verify page', () => {
  test('renders primary UI components', () => {
    render(
      <MemoryRouter>
        <Verify />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /verify image/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/secret key/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /verify/i })).toBeInTheDocument();
  });
});
