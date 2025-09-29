import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './components/Login';

test('renders login heading', () => {
  render(<App />);
  const heading = screen.getByText(/login/i);
  expect(heading).toBeInTheDocument();
});

test('login button exists', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});
