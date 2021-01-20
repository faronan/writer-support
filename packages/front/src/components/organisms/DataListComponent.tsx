import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useQuery } from '@apollo/client';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { CenterContainer } from '@/components/atoms/CenterContainer';
import { InfoAlert } from '@/components/atoms/InfoAlert';
import { DateFilterInputForm } from '@/components/molecules/DateFilterInputForm';
import { DataTextExample } from '@/components/molecules/DataTextExample';
import { DataLintRuleNames } from '@/components/molecules/DataLintRuleNames';
import { LINT_RULES } from '@/lib/RuleNameData';
import { ProofreadingDataListDocument } from '@graphql/graphql-operations';

export const DataListComponent = () => {
  const [session] = useSession();

  const today = new Date();
  const oneMonthAgoDay = new Date();
  oneMonthAgoDay.setMonth(today.getMonth() - 1);
  const [startDate, setStartDate] = useState(oneMonthAgoDay);
  const [endDate, setEndDate] = useState(today);

  type ruleToUsedCount = {
    key: string;
    value: any;
  };
  const [ruleUsedCountList, setRuleUsedCountList] = useState<ruleToUsedCount[]>(
    [],
  );

  type lintResultText = {
    targetLine: string;
    lintResultColumn: number;
  };
  const [lintExampleTextList, setLintExampleTextList] = useState<
    lintResultText[]
  >([]);

  const [userSelect, setUserSelect] = useState('');

  const { loading: queryLoading, data: queryData } = useQuery(
    ProofreadingDataListDocument,
  );

  const stateUpdate = () => {
    const userFilterProofreadingDataList = userSelect
      ? queryData.proofreadingDataList.filter(
          (data) => data.user.name == session.user.name,
        )
      : queryData.proofreadingDataList;

    const dateFilterProofreadingDataList = userFilterProofreadingDataList.filter(
      (data) =>
        startDate.toISOString() < data.createdAt &&
        data.createdAt < endDate.toISOString(),
    );

    const ruleNames = dateFilterProofreadingDataList
      .map((proofreadingData) =>
        proofreadingData.result.map((result) => result.ruleName),
      )
      .flat();
    const ruleUsedCountHash = ruleNames.reduce((dict, val) => {
      dict[val] = (dict[val] || 0) + 1;
      return dict;
    }, {});
    const sortedRuleUsedCountList = Object.keys(ruleUsedCountHash)
      .map((e) => ({ key: e, value: ruleUsedCountHash[e] }))
      .sort((a, b) => {
        if (a.value < b.value) return 1;
        if (a.value > b.value) return -1;
        return 0;
      });
    setRuleUsedCountList(sortedRuleUsedCountList);

    const lintExampleTexts = sortedRuleUsedCountList.map((hash) => {
      const ruleName = hash.key;

      const firstMatchProofreadingData = queryData.proofreadingDataList
        .filter(
          (data) =>
            data.result.filter((result) => result.ruleName == ruleName).length >
            0,
        )
        .sort((a, b) => {
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;
          return 0;
        })[0];
      const lintResult = firstMatchProofreadingData.result.filter(
        (result) => result.ruleName == ruleName,
      )[0];
      const targetLine = firstMatchProofreadingData.text.split(/\r\n|\n|↵/)[
        lintResult.line - 1
      ];
      const lintResultColumn = lintResult.column;

      return { targetLine, lintResultColumn };
    });
    setLintExampleTextList(lintExampleTexts);
  };

  useEffect(() => {
    if (queryLoading) {
      return;
    }
    stateUpdate();
  }, [queryLoading, startDate, endDate, userSelect]);

  return (
    <CenterContainer>
      <DateFilterInputForm
        startSelectedDate={startDate}
        startOnChange={setStartDate}
        endSelectedDate={endDate}
        endOnChange={setEndDate}
        selectedUser={userSelect}
        selectOnChange={(e) => {
          e.preventDefault();
          setUserSelect(e.target.value);
        }}
        selectOptions={['現在ログイン中のユーザー']}
      ></DateFilterInputForm>
      {ruleUsedCountList.length > 0 ?
      (<Accordion allowMultiple minW="full" border="1px" borderColor="gray.200">
        {ruleUsedCountList.map((hash, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              <DataLintRuleNames
                rank={index + 1}
                ruleNameView={LINT_RULES[hash.key]}
                usedCount={hash.value}
              ></DataLintRuleNames>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <DataTextExample
                index={index}
                lintExampleTextList={lintExampleTextList}
              ></DataTextExample>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion> ): <InfoAlert text="該当のデータはありません"></InfoAlert>}
    </CenterContainer>
  );
};
