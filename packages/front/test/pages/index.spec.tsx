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

  it('should render common view', async () => {
    client['useSession'] = jest.fn().mockReturnValue([null, false]);
    renderWithRouter(<Home />);

    expect(
      screen.getByRole('heading', { name: /writer support/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/© 2021 writer support/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
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

    expect(
      screen.getByRole('link', { name: /文章をチェック🗒/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /文章の癖を分析👀/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /ログアウト/i,
      }),
    ).toBeInTheDocument();
  });
});
