import { Box, Heading, Flex } from '@chakra-ui/react';
import { LinkText } from '@/components/atoms/LinkText';
import { AuthComponent } from '@/components/molecules/AuthComponent';

type Props = {
  title: string;
  isLogin?: boolean;
};

export const AppHeader = ({ title, isLogin }: Props) => {
  return (
    <Flex wrap="wrap" padding="1.5rem" bg="teal.400" color="white">
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          {title}
        </Heading>
      </Flex>

      <Box
        display={'flex'}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        {isLogin && (
          <>
            <LinkText path={'/check'} text={'文章をチェック🗒'}></LinkText>
            <LinkText path={'/show'} text={'文章の癖を分析👀'}></LinkText>
          </>
        )}
      </Box>

      <Box alignItems="center">
        <AuthComponent isLogin={isLogin}></AuthComponent>
      </Box>
    </Flex>
  );
};
