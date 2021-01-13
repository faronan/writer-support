import { LayoutBox } from '@/components/atoms/LayoutBox';
import { Table, Tbody, Tr, Td } from '@chakra-ui/react';
import { RedCode } from '@/components/atoms/RedCode';
import { LintResult } from '@graphql/graphql-operations';

type Props = {
  splitResponseTexts: string[];
  proofreadResults: ({
    __typename?: 'LintResult';
  } & Pick<LintResult, 'line' | 'ruleName' | 'message' | 'column'>)[];
};

export const ProofreadingResultTable = ({
  splitResponseTexts,
  proofreadResults,
}: Props) => {
  return (
    <LayoutBox>
      <Table variant="simple">
        <Tbody>
          {proofreadResults.map((v, index) => (
            <Tr key={index}>
              <Td width="20%">{`${v.line}行目`}</Td>
              <Td width="10%">
                <RedCode
                  text={splitResponseTexts[v.line - 1][v.column - 1]}
                ></RedCode>
              </Td>
              <Td width="70%">{v.message}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </LayoutBox>
  );
};
