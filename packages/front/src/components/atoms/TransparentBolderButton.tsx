import { MouseEvent } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  text: string;
};

export const TransparentBolderButton = ({ onClick, text }: Props) => {
  return (
    <Button
      mr="6"
      bg="transparent"
      border="1px"
      colorScheme="pink"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
