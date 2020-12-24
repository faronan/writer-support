import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '@/pages/index';

describe(`Home`, () => {
  it('render Next.js text', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: /welcome to next\.js!/i }),
    ).toHaveTextContent('Next.js!');
  });
});
