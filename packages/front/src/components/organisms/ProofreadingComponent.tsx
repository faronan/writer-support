import { MouseEvent, useEffect } from 'react';
import { FetchResult, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useSession } from 'next-auth/client';
import {
  AddProofreadingDataInput,
  CreateProofreadingDocument,
  CreateProofreadingMutation,
  FindUserDocument,
  CreateUserDocument,
} from '@graphql/graphql-operations';
import { CenterContainer } from '@/components/atoms/CenterContainer';
import { SuccessAlert } from '@/components/atoms/SuccessAlert';
import { ProofreadingInputForm } from '@/components/molecules/ProofreadingInputForm';
import { ProofreadingResultText } from '@/components/molecules/ProofreadingResultText';
import { ProofreadingResultTable } from '@/components/molecules/ProofreadingResultTable';
import {
  LINT_RULES,
  BASE_RULES,
  CHECK_RULES,
  QUALITY_RULES,
} from '@/lib/RuleNameData';

export const ProofreadingComponent = () => {
  const [text, setText] = useState('');
  const [session] = useSession();
  const [createProofreading] = useMutation(CreateProofreadingDocument);
  const { loading: userFindQueryLoading, data: userFindQueryData } = useQuery(
    FindUserDocument,
    {
      variables: { userArgs: { userEmail: session.user.email } },
    },
  );
  const [createUser] = useMutation(CreateUserDocument);

  useEffect(() => {
    if (userFindQueryLoading || userFindQueryData) {
      return;
    }
    createUser({
      variables: {
        userInput: {
          userEmail: session.user.email,
          userName: session.user.name,
        },
      },
    });
  }, [userFindQueryLoading]);

  const [checkedItems, setCheckedItems] = useState(
    new Array<boolean>(Object.keys(LINT_RULES).length).fill(false),
  );

  type createProofreadingResult = FetchResult<
    CreateProofreadingMutation,
    Record<string, any>,
    Record<string, any>
  >;

  const [response, setResponse] = useState<createProofreadingResult>({
    data: null,
  });

  const proofreadingButtonOnClick = async (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const selectRuleNames = checkedItems.reduce(
      (arr: string[], val, i) => (
        val && arr.push(Object.keys(LINT_RULES)[i]), arr
      ),
      [],
    );
    const proofreading: AddProofreadingDataInput = {
      text: text,
      ruleNames: selectRuleNames,
      userEmail: session.user.email,
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
        ruleNames={[
          Object.values(BASE_RULES),
          Object.values(CHECK_RULES),
          Object.values(QUALITY_RULES),
        ]}
      ></ProofreadingInputForm>

      {response.data &&
        (proofreadResults.length > 0 ? (
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
        ) : (
          <SuccessAlert text={'問題ありません🎉'}></SuccessAlert>
        ))}
    </CenterContainer>
  );
};
