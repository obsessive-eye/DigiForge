import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import UserManual from "./pages/UserManual";

describe('UserManual component', () => {
  test('renders all required sections', () => {
    render(
      <MemoryRouter>
        <UserManual />
      </MemoryRouter>
    );
    const sections = [
      'Getting Started',
      'Protecting an Image',
      'Understanding Results',
      'Verifying an Image',
      'Secret Key Safety',
      'Recommended Workflow',
      'Troubleshooting',
      'How the Technology Works',
    ];
    sections.forEach((title) => {
      expect(screen.getByRole('heading', { name: new RegExp(title, 'i') })).toBeInTheDocument();
    });
  });
});
