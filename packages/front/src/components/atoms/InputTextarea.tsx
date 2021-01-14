import { ChangeEvent } from 'react';
import { Textarea } from '@chakra-ui/react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
};

export const InputTextarea = ({ value, onChange, placeholder }: Props) => {
  return (
    <Textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      minH="xs"
    />
  );
};
