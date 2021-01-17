import { RankBadge } from '@/components/atoms/RankBadge';
import { NoBorderBox } from '@/components/atoms/NoBorderBox';
import { BoldText } from '@/components/atoms/BoldText';
import { GraySmallText } from '@/components/atoms/GraySmallText';

type Props = {
  rank: number;
  ruleNameView: string;
  usedCount: string;
};

export const DataLintRuleNames = ({ rank, ruleNameView, usedCount }: Props) => {
  return (
    <>
      <RankBadge rank={rank}></RankBadge>
      <NoBorderBox>
        <BoldText text={ruleNameView}></BoldText>
        <GraySmallText text={`${usedCount}回`}></GraySmallText>
      </NoBorderBox>
    </>
  );
};
