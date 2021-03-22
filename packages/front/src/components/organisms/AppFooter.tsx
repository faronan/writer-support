import { Box, Flex } from '@chakra-ui/react';

export const AppFooter = () => {
  return (
    <Flex wrap="wrap" padding="1.5rem" bg="teal.400" color="white">
      <Box display={'flex'} alignItems="left" flexGrow={1}>
        © 2021 Writer Support
      </Box>
    </Flex>
  );
};
