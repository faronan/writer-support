import { Box, Flex, Button, Link } from '@chakra-ui/react';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { GITHUB_URL, TWITTER_URL } from '@/lib/ExternalLinkData';

export const AppFooter = () => {
  return (
    <Flex wrap="wrap" padding="1.5rem" bg="teal.400" color="white">
      <Box display={'flex'} alignItems="left" flexGrow={1}>
        © 2021 Writer Support
      </Box>
      <Box display={'flex'} alignItems="right" flexGrow={1}>
        <Button colorScheme="twitter" leftIcon={<FaTwitter />} ml="auto">
          <Link href={TWITTER_URL} isExternal>
            Twitter
          </Link>
        </Button>
        <Button background="black" leftIcon={<FaGithub />}>
          <Link href={GITHUB_URL} isExternal>
            GitHub
          </Link>
        </Button>
      </Box>
    </Flex>
  );
};
