import { ChangeEvent } from 'react';
import { Checkbox } from '@chakra-ui/react';

type Props = {
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

export const CheckBox = ({ isChecked, onChange, label }: Props) => {
  return (
    <Checkbox isChecked={isChecked} onChange={onChange}>
      {label}
    </Checkbox>
  );
};
