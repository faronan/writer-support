import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { MockedProvider } from '@apollo/client/testing';
import client from 'next-auth/client';
import Check from '@/pages/check';
import { LINT_RULES } from '@/lib/RuleNameData';
import { FindUserDocument } from '@graphql/graphql-operations';

describe(`Check`, () => {
  const testTemplateWord = 'testTemplateWord';
  const testNgWord = 'testNgWord';
  const testEmail = 'test@test.com';

  const mocks = [
    {
      request: {
        query: FindUserDocument,
        variables: { userArgs: { userEmail: testEmail } },
      },
      result: {
        data: {
          findUser: {
            ngWords: [{ wordText: testNgWord }],
            templateWords: [{ wordText: testTemplateWord }],
          },
        },
      },
    },
  ];

  beforeAll(async () => {
    client['useSession'] = jest
      .fn()
      .mockReturnValue([{ user: { email: testEmail } }, false]);
  });

  it('should render word feature view', async () => {
    const routerMock = {
      basePath: '',
      pathname: '/',
      route: '/',
      asPath: '/',
      query: {},
      push: jest.fn().mockResolvedValue(true),
      replace: jest.fn().mockResolvedValue(true),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
    render(
      <RouterContext.Provider value={routerMock}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Check />
        </MockedProvider>
      </RouterContext.Provider>,
    );
    expect(screen.getByText(/スニペット機能/i)).toBeInTheDocument();
    expect(screen.getByText(/ngワード機能/i)).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(testTemplateWord)),
    ).toBeInTheDocument();
    expect(await screen.findByText(new RegExp(testNgWord))).toBeInTheDocument();
  });

  it('should render input form view', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Check />
      </MockedProvider>,
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    Object.values(LINT_RULES).forEach(async (name) => {
      expect(screen.getByText(new RegExp(name))).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /送信/i })).toBeInTheDocument();
  });
});
