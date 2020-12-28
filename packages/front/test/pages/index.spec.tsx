import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '@/pages/index';
import { MockedProvider } from '@apollo/client/testing';

describe(`Home`, () => {
  it('render Next.js text', () => {
    render(
      <MockedProvider>
        <Home />
      </MockedProvider>,
    );
    expect(
      screen.getByRole('heading', { name: /welcome to next\.js!/i }),
    ).toHaveTextContent('Next.js!');
  });
});
