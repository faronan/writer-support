import { screen } from '@testing-library/react';
import { auth, renderWithRouter } from '@test/__helpers';
import Show from '@/pages/show';
import { ProofreadingDataListDocument } from '@graphql/graphql-operations';
import { LINT_RULES } from '@/lib/RuleNameData';

describe(`Show`, () => {
  const yesterDay = new Date();
  yesterDay.setDate(new Date().getDate() - 1);

  const testText = 'testText';
  const ruleName1 = Object.keys(LINT_RULES)[0];
  const ruleName2 = Object.keys(LINT_RULES)[1];

  const mocks = [
    {
      request: {
        query: ProofreadingDataListDocument,
      },
      result: {
        data: {
          proofreadingDataList: [
            {
              createdAt: yesterDay.toISOString(),
              text: testText,
              user: { name: '' },
              result: [
                {
                  line: 1,
                  column: 1,
                  message: '',
                  ruleName: ruleName1,
                },
                {
                  line: 1,
                  column: 2,
                  message: '',
                  ruleName: ruleName1,
                },
                {
                  line: 1,
                  column: 3,
                  message: '',
                  ruleName: ruleName2,
                },
              ],
            },
          ],
        },
      },
    },
  ];

  beforeAll(async () => {
    auth();
  });

  beforeEach(async () => {
    renderWithRouter(<Show />, mocks);
  });

  it('should render DateFilterInput view', async () => {
    expect(await screen.findByText(/開始日/i)).toBeInTheDocument();
    expect(await screen.findByText(/終了日/i)).toBeInTheDocument();
    expect(await screen.findByText(/ユーザーの絞り込み/i)).toBeInTheDocument();
    expect(
      await screen.findByRole('combobox', { name: /ユーザーの絞り込み/i }),
    ).toBeInTheDocument();
  });

  it('should render DateTextExample view', async () => {
    expect(
      await screen.findByRole('heading', {
        name: new RegExp(LINT_RULES[ruleName1]),
      }),
    ).toBeInTheDocument();
    expect(await screen.findByText(/2回/i)).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', {
        name: new RegExp(LINT_RULES[ruleName2]),
      }),
    ).toBeInTheDocument();
    expect(await screen.findByText(/1回/i)).toBeInTheDocument();
  });
});
