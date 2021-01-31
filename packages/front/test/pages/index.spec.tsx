import { screen } from '@testing-library/react';
import client from 'next-auth/client';
import { auth, renderWithRouter } from '@test/__helpers';
import Home from '@/pages/index';

describe(`Home`, () => {
  it('should render loading view', async () => {
    client['useSession'] = jest.fn().mockReturnValue([null, true]);
    renderWithRouter(<Home />);

    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('should render signin view', async () => {
    client['useSession'] = jest.fn().mockReturnValue([null, false]);
    renderWithRouter(<Home />);

    expect(
      screen.getByRole('button', {
        name: /ゲストログイン/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render login view', async () => {
    auth();
    renderWithRouter(<Home />);

    //TODO: 他のヘッダーの表示 + ログアウト押した後の遷移もテスト
    expect(
      screen.getByRole('button', {
        name: /ログアウト/i,
      }),
    ).toBeInTheDocument();
  });
});
