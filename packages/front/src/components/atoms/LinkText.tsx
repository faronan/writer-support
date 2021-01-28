import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';

type Props = {
  path: string;
  text: string;
};

export const LinkText = ({ path, text }: Props) => {
  return (
    <NextLink passHref href={path}>
      <Link mr={6}>{text}</Link>
    </NextLink>
  );
};
