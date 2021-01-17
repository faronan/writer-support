import { BoldText } from '@/components/atoms/BoldText';
import { NoBorderBox } from '@/components/atoms/NoBorderBox';
import { NormalCode } from '@/components/atoms/NormalCode';
import { RedCode } from '@/components/atoms/RedCode';

type Props = {
  index: number;
  lintExampleTextList: {
    targetLine: string;
    lintResultColumn: number;
  }[];
};

export const DataTextExample = ({ index, lintExampleTextList }: Props) => {
  const targetLine = lintExampleTextList[index].targetLine;
  const lintResultColumn = lintExampleTextList[index].lintResultColumn;
  return (
    <>
      <BoldText text={'例'}></BoldText>
      <NoBorderBox>
        <NormalCode
          text={targetLine.slice(0, lintResultColumn - 1)}
        ></NormalCode>
        <RedCode text={targetLine[lintResultColumn - 1]}></RedCode>
        <NormalCode
          text={targetLine.slice(
            lintResultColumn,
            targetLine.indexOf('。') + 1,
          )}
        ></NormalCode>
      </NoBorderBox>
    </>
  );
};
