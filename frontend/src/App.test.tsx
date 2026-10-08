import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";

describe('App component', () => {
  test('renders without crashing and contains navigation links', () => {
    render(<App />);
    const links = ['Dashboard', 'Protect', 'Verify', 'User Manual', 'About'];
    links.forEach((text) => {
      const matches = screen.getAllByRole('link', { name: new RegExp(text, 'i') });
      expect(matches.length).toBeGreaterThan(0);
    });
  });
});
