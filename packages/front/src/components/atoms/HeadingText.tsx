import { Heading } from '@chakra-ui/react';

type Props = {
  text: string;
};

export const HeadingText = ({ text }: Props) => {
  return (
    <Heading as="h3" size="md" mt="5">
      {text}
    </Heading>
  );
};
