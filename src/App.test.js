import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders proper header', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Reverse Polish notation calculator/i);
  expect(linkElement).toBeInTheDocument();
});
