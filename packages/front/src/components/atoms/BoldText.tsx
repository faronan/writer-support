import { Text } from '@chakra-ui/react';

type Props = {
  text: string;
};

export const BoldText = ({ text }: Props) => {
  return (
    <Text align="left" ml="5" fontWeight="semibold" as="h4">
      {text}
    </Text>
  );
};
