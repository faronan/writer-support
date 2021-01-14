import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import client, { Session } from 'next-auth/client';
import Home from '@/pages/index';
import { RULE_NAMES_FOR_VIEW } from '@/components/organisms/ProofreadingComponent';

describe(`Home`, () => {
  it('should　render loading view', async () => {
    client['useSession'] = jest.fn().mockReturnValue([null, true]);

    render(
      <MockedProvider>
        <Home />
      </MockedProvider>,
    );

    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('should render signin view', async () => {
    client['useSession'] = jest.fn().mockReturnValue([null, false]);

    render(
      <MockedProvider>
        <Home />
      </MockedProvider>,
    );

    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it('should render login view', async () => {
    const mockSession: Session = {
      expires: null,
      user: { name: 'testName' },
    };

    client['useSession'] = jest.fn().mockReturnValue([mockSession, false]);

    render(
      <MockedProvider>
        <Home />
      </MockedProvider>,
    );

    expect(
      screen.getByRole('button', {
        name: /sign out/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render proofreading view', async () => {
    client['useSession'] = jest.fn().mockReturnValue([null, false]);

    render(
      <MockedProvider>
        <Home />
      </MockedProvider>,
    );
    expect(
      screen.getByRole('textbox'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /送信/i }),
    ).toBeInTheDocument();

    RULE_NAMES_FOR_VIEW.forEach(name => {
      expect(
        screen.getByText(new RegExp(name)),
      ).toBeInTheDocument();
    });
  });
});
