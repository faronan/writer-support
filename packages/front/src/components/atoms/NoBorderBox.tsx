import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
};

export const NoBorderBox = ({ children }: Props) => {
  return (
    <Box w="100%" p="5">
      {children}
    </Box>
  );
};
