import { BorderBox } from '@/components/atoms/BorderBox';
import { NormalCode } from '@/components/atoms/NormalCode';
import { RedCode } from '@/components/atoms/RedCode';
import { LintResult } from '@graphql/graphql-operations';

type Props = {
  splitResponseTexts: string[];
  proofreadResults: ({
    __typename?: 'LintResult';
  } & Pick<LintResult, 'line' | 'ruleName' | 'message' | 'column'>)[];
};

export const ProofreadingResultText = ({
  splitResponseTexts,
  proofreadResults,
}: Props) => {
  return (
    <BorderBox>
      {splitResponseTexts.map((row, rowIndex) => {
        const proofreadResultsInRow = proofreadResults.filter(
          (v) => v.line == rowIndex + 1,
        );
        return (
          <div key={rowIndex}>
            {proofreadResultsInRow.length > 0 ? (
              proofreadResultsInRow.map((result, resultIndex, array) => {
                return (
                  <span key={resultIndex}>
                    {array.length == 1 ? (
                      <>
                        <NormalCode
                          text={row.slice(0, result.column - 1)}
                        ></NormalCode>
                        <RedCode text={row[result.column - 1]}></RedCode>
                        <NormalCode
                          text={row.slice(result.column)}
                        ></NormalCode>
                      </>
                    ) : resultIndex == 0 ? (
                      <>
                        <NormalCode
                          text={row.slice(0, result.column - 1)}
                        ></NormalCode>
                        <RedCode text={row[result.column - 1]}></RedCode>
                        <NormalCode
                          text={row.slice(
                            result.column,
                            array[resultIndex + 1].column - 1,
                          )}
                        ></NormalCode>
                      </>
                    ) : resultIndex == array.length - 1 ? (
                      <>
                        <RedCode text={row[result.column - 1]}></RedCode>
                        <NormalCode
                          text={row.slice(result.column)}
                        ></NormalCode>
                      </>
                    ) : (
                      <>
                        <RedCode text={row[result.column - 1]}></RedCode>
                        <NormalCode
                          text={row.slice(
                            result.column,
                            array[resultIndex + 1].column - 1,
                          )}
                        ></NormalCode>
                      </>
                    )}
                  </span>
                );
              })
            ) : (
              <NormalCode text={row}></NormalCode>
            )}
          </div>
        );
      })}
    </BorderBox>
  );
};
