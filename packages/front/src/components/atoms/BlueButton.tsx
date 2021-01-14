import { MouseEvent } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  text: string;
};

export const BlueButton = ({ onClick, text }: Props) => {
  return (
    <Button mt={5} colorScheme="blue" onClick={onClick}>
      {text}
    </Button>
  );
};
