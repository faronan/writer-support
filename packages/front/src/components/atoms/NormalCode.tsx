import { Code } from '@chakra-ui/react';

type Props = {
  text: string;
};

export const NormalCode = ({ text }: Props) => {
  return <Code>{text}</Code>;
};
