import { Text } from '@chakra-ui/react';
import { MouseEvent } from 'react';

type Props = {
  onClick: (e: MouseEvent<HTMLParagraphElement>) => void;
  text: string;
};

export const ClickableText = ({ onClick, text }: Props) => {
  return (
    <Text as="ins" color="cornflowerblue" onClick={onClick}>
      {text}
    </Text>
  );
};
