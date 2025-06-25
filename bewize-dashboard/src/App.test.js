import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('lottie-react', () => () => <div>Lottie Animation</div>);

import App from './App';

test('renders login button', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

});
