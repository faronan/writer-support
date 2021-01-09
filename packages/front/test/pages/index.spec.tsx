import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '@/pages/index';
import { MockedProvider } from '@apollo/client/testing';
import client, { Session } from 'next-auth/client';

describe(`Home`, () => {
  it('should　render loading view', async () => {
    client['useSession'] = jest.fn().mockReturnValueOnce([null, true]);

    render(
      <MockedProvider>
        <Home />
      </MockedProvider>,
    );

    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('should render signin view', async () => {
    client['useSession'] = jest.fn().mockReturnValueOnce([null, false]);

    render(
      <MockedProvider>
        <Home />
      </MockedProvider>,
    );

    expect(screen.getByText(/not signed in/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it('should render login view', async () => {
    const testName = 'testName';
    const mockSession: Session = {
      expires: null,
      user: { name: testName },
    };

    client['useSession'] = jest.fn().mockReturnValueOnce([mockSession, false]);

    render(
      <MockedProvider>
        <Home />
      </MockedProvider>,
    );

    expect(screen.getByText(new RegExp(testName))).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /sign out/i,
      }),
    ).toBeInTheDocument();
  });
});
