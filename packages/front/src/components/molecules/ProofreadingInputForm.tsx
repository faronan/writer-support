import { ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { Stack } from '@chakra-ui/react';
import { BlueButton } from '@/components/atoms/BlueButton';
import { InputTextarea } from '@/components/atoms/InputTextarea';
import { CheckBox } from '@/components/atoms/CheckBox';

type Props = {
  inputText: string;
  textAreaOnChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  buttonOnClick: (e: MouseEvent<HTMLButtonElement>) => void;
  checkBoxItems: boolean[];
  setCheckBoxItems: (value: SetStateAction<boolean[]>) => void;
  ruleNames: string[];
};

export const ProofreadingInputForm = ({
  inputText,
  textAreaOnChange,
  buttonOnClick,
  checkBoxItems,
  setCheckBoxItems,
  ruleNames,
}: Props) => {
  return (
    <>
      <InputTextarea
        value={inputText}
        onChange={textAreaOnChange}
        placeholder="ここに文章を入力してください"
      ></InputTextarea>
      <BlueButton onClick={buttonOnClick} text="送信"></BlueButton>

      <Stack mt={10} spacing={1}>
        {checkBoxItems.map((checkedItem, index, array) => (
          <div key = {index}>
            <CheckBox
              isChecked={checkedItem}
              onChange={(e) => {
                setCheckBoxItems(
                  array.map((item, i) => (i === index ? e.target.checked : item)),
                );
              }}
              label={ruleNames[index]}
            ></CheckBox>
          </div>
        ))}
      </Stack>
    </>
  );
};
