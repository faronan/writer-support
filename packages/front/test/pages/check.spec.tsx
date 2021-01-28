import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import client from 'next-auth/client';
import Check from '@/pages/check';
import { LINT_RULES } from '@/lib/RuleNameData';

describe(`Check`, () => {
  it('should render proofreading view', async () => {
    client['useSession'] = jest.fn().mockReturnValue([null, false]);

    render(
      <MockedProvider>
        <Check />
      </MockedProvider>,
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /送信/i })).toBeInTheDocument();

    Object.values(LINT_RULES).forEach((name) => {
      expect(screen.getByText(new RegExp(name))).toBeInTheDocument();
    });
  });
});
