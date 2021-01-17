import { useQuery } from '@apollo/client';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { CenterContainer } from '@/components/atoms/CenterContainer';
import { DataTextExample } from '@/components/molecules/DataTextExample';
import { DataLintRuleNames } from '@/components/molecules/DataLintRuleNames';
import { LINT_RULES } from '@/lib/RuleNameData';
import { ProofreadingDataListDocument } from '@graphql/graphql-operations';

export const DataListComponent = () => {
  const { loading: queryLoading, data: queryData } = useQuery(
    ProofreadingDataListDocument,
  );

  const sortedRuleUsedCountList = (() => {
    if (queryLoading) {
      return [];
    }

    const ruleNames = queryData.proofreadingDataList
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
    return sortedRuleUsedCountList;
  })();

  const lintExampleTextList = (() => {
    if (!sortedRuleUsedCountList) {
      return [];
    }

    return sortedRuleUsedCountList.map((hash) => {
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
  })();

  return (
    <CenterContainer>
      <Accordion allowMultiple minW="full">
        {sortedRuleUsedCountList.map((hash, index) => (
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
    </CenterContainer>
  );
};
