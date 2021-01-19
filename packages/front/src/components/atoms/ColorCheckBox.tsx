import { ChangeEvent } from 'react';
import { Checkbox } from '@chakra-ui/react';

type Props = {
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

export const ColorCheckBox = ({ isChecked, onChange, label }: Props) => {
  return (
    <Checkbox
      isChecked={isChecked}
      onChange={onChange}
      iconColor="red.200"
      borderColor="green.200"
    >
      {label}
    </Checkbox>
  );
};
