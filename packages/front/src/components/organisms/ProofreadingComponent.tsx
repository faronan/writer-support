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
  CreateNgWordDocument,
  CreateTemplateWordDocument,
  Word,
} from '@graphql/graphql-operations';
import { CenterContainer } from '@/components/atoms/CenterContainer';
import { SuccessAlert } from '@/components/atoms/SuccessAlert';
import { ProofreadingInputForm } from '@/components/molecules/ProofreadingInputForm';
import { ProofreadingResultText } from '@/components/molecules/ProofreadingResultText';
import { ProofreadingResultTable } from '@/components/molecules/ProofreadingResultTable';
import { CollapseText } from '@/components/molecules/CollapseText';
import { UserWords } from '@/components/molecules/UserWords';

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
  const [createNgWord] = useMutation(CreateNgWordDocument);
  const [createTemplateWord] = useMutation(CreateTemplateWordDocument);

  useEffect(() => {
    if (userFindQueryLoading) {
      return;
    }
    if (userFindQueryData) {
      setTemplateWords(userFindQueryData.findUser.templateWords);
      setNgWords(userFindQueryData.findUser.ngWords);
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

  type userWords = {
    __typename?: 'Word';
  } & Pick<Word, 'wordText'>[];
  const [templateWords, setTemplateWords] = useState<userWords>([]);
  const [ngWords, setNgWords] = useState<userWords>([]);
  const [isNgAlertShow, setIsNgAlertShow] = useState(false);

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
      <CollapseText text={'スニペット機能'}>
        <UserWords
          words={templateWords}
          createWord={(word) => {
            createTemplateWord({
              variables: {
                wordInput: {
                  wordText: word,
                  userEmail: session.user.email,
                },
              },
            });
            setTemplateWords(templateWords.concat([{ wordText: word }]));
          }}
          wordType={'template'}
          description={'使用頻度の高いワードを登録してください'}
        ></UserWords>
      </CollapseText>
      <CollapseText text={'NGワード機能'}>
        <UserWords
          words={ngWords}
          createWord={(word) => {
            createNgWord({
              variables: {
                wordInput: {
                  wordText: word,
                  userEmail: session.user.email,
                },
              },
            });
            setNgWords(ngWords.concat([{ wordText: word }]));
          }}
          wordType={'ng'}
          description={'文章に含めたくないワードを登録してください'}
        ></UserWords>
      </CollapseText>
      <ProofreadingInputForm
        inputText={text}
        textAreaOnChange={(e) => {
          const text = e.target.value;
          setText(text);
          const isIncludeNgWord = ngWords
            .map((word) => text.includes(word.wordText))
            .some((bool) => bool);
          setIsNgAlertShow(isIncludeNgWord);
        }}
        buttonOnClick={proofreadingButtonOnClick}
        checkBoxItems={checkedItems}
        setCheckBoxItems={setCheckedItems}
        ruleNames={[
          Object.values(BASE_RULES),
          Object.values(CHECK_RULES),
          Object.values(QUALITY_RULES),
        ]}
        isNgAlertShow={isNgAlertShow}
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
