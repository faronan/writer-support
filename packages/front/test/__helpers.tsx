import { ReactElement } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { NextRouter } from 'next/router';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import client from 'next-auth/client';

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined), // This one fixed it for me
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

export const renderWithRouter = (
  component: ReactElement,
  mocks?: ReadonlyArray<MockedResponse>,
): RenderResult => {
  return render(
    <RouterContext.Provider value={mockRouter}>
      {mocks ? (
        <MockedProvider mocks={mocks} addTypename={false}>
          {component}
        </MockedProvider>
      ) : (
        <MockedProvider>{component}</MockedProvider>
      )}
    </RouterContext.Provider>,
  );
};

export const auth = (email = 'test@test.com') => {
  client['useSession'] = jest
    .fn()
    .mockReturnValue([{ user: { email: email } }, false]);
};
