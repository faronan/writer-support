import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import client, { Session } from 'next-auth/client';
import Home from '@/pages/index';

describe(`Home`, () => {
  it('should render loading view', async () => {
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
      screen.getByRole('button', {
        name: /ゲストログイン/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render login view', async () => {
    const mockSession: Session = {
      expires: null,
      user: { name: '' },
    };

    client['useSession'] = jest.fn().mockReturnValue([mockSession, false]);

    render(
      <MockedProvider>
        <Home />
      </MockedProvider>,
    );

    //TODO: 他のヘッダーの表示 + ログアウト押した後の遷移もテスト
    expect(
      screen.getByRole('button', {
        name: /ログアウト/i,
      }),
    ).toBeInTheDocument();
  });
});
