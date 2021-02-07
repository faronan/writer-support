import { HStack } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const ShortIntervalHStack = ({ children }: Props) => {
  return <HStack spacing={1}>{children}</HStack>;
};
