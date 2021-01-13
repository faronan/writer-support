import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const LayoutBox = ({ children }: Props) => {
  return (
    <Box border="1px" borderColor="gray.200" w="100%" p="5">
      {children}
    </Box>
  );
};
