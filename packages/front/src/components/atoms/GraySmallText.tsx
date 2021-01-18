import { Text } from '@chakra-ui/react';

type Props = {
  text: string;
};

export const GraySmallText = ({ text }: Props) => {
  return (
    <Text align="left" ml="5" color="gray.500" fontSize="xs">
      {text}
    </Text>
  );
};
