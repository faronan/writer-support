import { MouseEvent } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  text: string;
};

export const BlackButton = ({ onClick, text }: Props) => {
  return (
    <Button
      background="gray.700"
      variant="solid"
      color="white"
      size="lg"
      float="right"
      mr="2"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
