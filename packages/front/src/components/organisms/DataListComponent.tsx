import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useQuery } from '@apollo/client';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { HalfGrid } from '@/components/atoms/HalfGrid';
import { ShortIntervalStack } from '@/components/atoms/ShortIntervalStack';
import { HeadingText } from '@/components/atoms/HeadingText';
import { InfoAlert } from '@/components/atoms/InfoAlert';
import { PieGraph } from '@/components/atoms/PieGraph';
import { LineGraph } from '@/components/atoms/LineGraph';
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

  const [proofreadingDataList, setProofreadingDataList] = useState([]);
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
    setProofreadingDataList(dateFilterProofreadingDataList);
  };

  useEffect(() => {
    if (queryLoading) {
      return;
    }
    stateUpdate();
  }, [queryLoading, startDate, endDate, userSelect]);

  const ruleUsedCountHash = (() => {
    const ruleNames = proofreadingDataList
      .map((proofreadingData) =>
        proofreadingData.result.map((result) => result.ruleName),
      )
      .flat();
    const ruleUsedCountHash = ruleNames.reduce((dict, val) => {
      dict[val] = (dict[val] || 0) + 1;
      return dict;
    }, {});
    return ruleUsedCountHash;
  })();

  const ruleUsedCountList = Object.keys(ruleUsedCountHash)
    .map((e) => ({ key: e, value: ruleUsedCountHash[e] }))
    .sort((a, b) => {
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      return 0;
    });

  const lintExampleTextList = ruleUsedCountList.map((hash) => {
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

  const dataForPieGraph = ruleUsedCountList.map((dict) => {
    return { name: LINT_RULES[dict['key']], value: dict['value'] };
  });

  const dataForLineGraph = (() => {
    const names = Array.from(
      new Set(proofreadingDataList.map((data) => data.createdAt.slice(0, 10))),
    );

    return names.reduce(
      (array, name) =>
        array.concat([
          {
            name: name,
            value: proofreadingDataList
              .filter((data) => data.createdAt.indexOf(name) != -1)
              .reduce((sum, data) => sum + data.result.length, 0),
          },
        ]),
      [],
    );
  })();

  return (
    <ShortIntervalStack>
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
        selectOptions={[`現在ログイン中のユーザー(${session.user.email})`]}
      ></DateFilterInputForm>
      <HalfGrid>
        <ShortIntervalStack>
          {ruleUsedCountList.length > 0 ? (
            <>
              <HeadingText text="間違えやすい文法"></HeadingText>
              <Accordion
                allowMultiple
                minW="full"
                border="1px"
                borderColor="gray.200"
              >
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
              </Accordion>
            </>
          ) : (
            //ヘッターまでの画面サイズを確保
            <Box minH="lg">
              <InfoAlert text="該当のデータはありません"></InfoAlert>
            </Box>
          )}
        </ShortIntervalStack>
        {ruleUsedCountList.length > 0 && (
          <ShortIntervalStack>
            <HeadingText text="文法ミスの内訳"></HeadingText>
            <PieGraph data={dataForPieGraph} />
            <HeadingText text="期間別の推移"></HeadingText>
            <LineGraph data={dataForLineGraph} />
          </ShortIntervalStack>
        )}
      </HalfGrid>
    </ShortIntervalStack>
  );
};
