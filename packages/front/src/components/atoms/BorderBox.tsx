import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
};

export const BorderBox = ({ children }: Props) => {
  return (
    <Box border="1px" borderColor="gray.200" w="100%" p="5">
      {children}
    </Box>
  );
};
