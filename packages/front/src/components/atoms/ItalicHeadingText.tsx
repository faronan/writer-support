import { Heading } from '@chakra-ui/react';

type Props = {
  text: string;
};

export const ItalicHeadingText = ({ text }: Props) => {
  return (
    <Heading as="i" size="xl">
      {text}
    </Heading>
  );
};
