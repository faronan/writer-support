import { ChangeEvent, MouseEvent, SetStateAction } from 'react';
import {
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { BorderBox } from '@/components/atoms/BorderBox';
import { EditIcon } from '@chakra-ui/icons';
import { InputTextarea } from '@/components/atoms/InputTextarea';
import { ColorCheckBox } from '@/components/atoms/ColorCheckBox';
import { CheckBox } from '@/components/atoms/CheckBox';
import { BlueButton } from '@/components/atoms/BlueButton';

type Props = {
  inputText: string;
  textAreaOnChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  buttonOnClick: (e: MouseEvent<HTMLButtonElement>) => void;
  checkBoxItems: boolean[];
  setCheckBoxItems: (value: SetStateAction<boolean[]>) => void;
  ruleNames: string[][];
};

export const ProofreadingInputForm = ({
  inputText,
  textAreaOnChange,
  buttonOnClick,
  checkBoxItems,
  setCheckBoxItems,
  ruleNames,
}: Props) => {
  const getIndex = (name: string) => {
    return ruleNames
      .reduce((array, names) => array.concat(names), [])
      .indexOf(name);
  };

  const getBulkCheckboxIsChecked = (index: number) => {
    return ruleNames[index]
      .map((name) => getIndex(name))
      .map((index) => checkBoxItems[index])
      .every((item) => item);
  };

  const BulkCheckboxSelect = (index: number, checked: boolean) => {
    const selectedIndex = ruleNames[index].map((name) => getIndex(name));
    setCheckBoxItems(
      checkBoxItems.map((item, i) =>
        selectedIndex.includes(i) ? checked : item,
      ),
    );
  };

  return (
    <BorderBox>
      <EditIcon mb={2}></EditIcon>
      <InputTextarea
        value={inputText}
        onChange={textAreaOnChange}
        placeholder="ここに文章を入力してください"
      ></InputTextarea>
      <Tabs mt={10} minH="xs" variant="enclosed">
        <TabList>
          <Tab>基本ルール</Tab>
          <Tab>チェック項目</Tab>
          <Tab>品質向上</Tab>
        </TabList>
        <TabPanels>
          {ruleNames.map((names, index) => (
            <TabPanel key={index}>
              <Stack spacing={1}>
                <ColorCheckBox
                  isChecked={getBulkCheckboxIsChecked(index)}
                  onChange={(e) => {
                    e.preventDefault();
                    BulkCheckboxSelect(index, e.target.checked);
                  }}
                  label={'一括選択'}
                ></ColorCheckBox>
                {names.map((name) => (
                  <CheckBox
                    isChecked={checkBoxItems[getIndex(name)]}
                    onChange={(e) => {
                      e.preventDefault();
                      setCheckBoxItems(
                        checkBoxItems.map((item, i) =>
                          i === getIndex(name) ? e.target.checked : item,
                        ),
                      );
                    }}
                    label={name}
                    key={name}
                  ></CheckBox>
                ))}
              </Stack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <BlueButton onClick={buttonOnClick} text="送信"></BlueButton>
    </BorderBox>
  );
};
