import { Code } from '@chakra-ui/react';

type Props = {
  text: string;
};

export const RedCode = ({ text }: Props) => {
  return <Code colorScheme="red">{text}</Code>;
};
