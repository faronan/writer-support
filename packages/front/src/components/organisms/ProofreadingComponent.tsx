import { MouseEvent } from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useSession } from 'next-auth/client';
import {
  AddProofreadingDataInput,
  CreateProofreadingDocument,
  CreateProofreadingMutation,
} from '@graphql/graphql-operations';
import { CenterContainer } from '@/components/atoms/CenterContainer';
import { SuccessAlert } from '@/components/atoms/SuccessAlert';
import { ProofreadingInputForm } from '@/components/molecules/ProofreadingInputForm';
import { ProofreadingResultText } from '@/components/molecules/ProofreadingResultText';
import { ProofreadingResultTable } from '@/components/molecules/ProofreadingResultTable';
import { LINT_RULES } from '@/lib/RuleNameData';

export const ProofreadingComponent = () => {
  const [text, setText] = useState('');
  const [session] = useSession();
  const [createProofreading] = useMutation(CreateProofreadingDocument);

  const [checkedItems, setCheckedItems] = useState(
    new Array<boolean>(2).fill(false),
  );

  type createProofreadingResult = FetchResult<
    CreateProofreadingMutation,
    Record<string, any>,
    Record<string, any>
  >;

  const [response, setResponse] = useState<createProofreadingResult>({
    data: null,
  });

  const RULE_NAMES = ['no-dropping-the-ra', 'no-doubled-joshi'];

  const proofreadingButtonOnClick = async (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const selectRuleNames = checkedItems.reduce(
      (arr: string[], val, i) => (val && arr.push(RULE_NAMES[i]), arr),
      [],
    );
    const proofreading: AddProofreadingDataInput = {
      text: text,
      ruleNames: selectRuleNames,
      userEmail: session.user.email,
      userName: session.user.name,
    };
    const response = await createProofreading({
      variables: { proofreading: proofreading },
    });
    setResponse(response);
  };

  const splitResponseText = response.data
    ? response.data.createProofreading.text.split(/\r\n|\n|↵/)
    : [];

  const proofreadResults = response.data
    ? response.data.createProofreading.result
    : [];

  return (
    <CenterContainer>
      <ProofreadingInputForm
        inputText={text}
        textAreaOnChange={(e) => {
          setText(e.target.value);
        }}
        buttonOnClick={proofreadingButtonOnClick}
        checkBoxItems={checkedItems}
        setCheckBoxItems={setCheckedItems}
        ruleNames={Object.values(LINT_RULES)}
      ></ProofreadingInputForm>

      {response.data && (
        <>
          <SuccessAlert text={'校正結果です'}></SuccessAlert>
          <ProofreadingResultText
            splitResponseTexts={splitResponseText}
            proofreadResults={proofreadResults}
          ></ProofreadingResultText>
          <ProofreadingResultTable
            splitResponseTexts={splitResponseText}
            proofreadResults={proofreadResults}
          ></ProofreadingResultTable>
        </>
      )}
    </CenterContainer>
  );
};
