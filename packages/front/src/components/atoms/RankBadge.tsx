import { Badge } from '@chakra-ui/react';

type Props = {
  rank: number;
};

const TOP_COLORS = {
  1: 'yellow.300',
  2: 'gray.300',
  3: 'orange.600',
};

const DEFAULT_COLOR = 'black';

export const RankBadge = ({ rank }: Props) => {
  const color = TOP_COLORS[rank] || DEFAULT_COLOR;

  return (
    <Badge borderRadius="full" px="2" bg={color}>
      {rank}
    </Badge>
  );
};
