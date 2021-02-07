import { Stack } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const ShortIntervalStack = ({ children }: Props) => {
  return <Stack spacing={1}>{children}</Stack>;
};
