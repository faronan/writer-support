import { ChangeEvent, MouseEvent, SetStateAction } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { BorderBox } from '@/components/atoms/BorderBox';
import { EditIcon } from '@chakra-ui/icons';
import { ShortIntervalHStack } from '@/components/atoms/ShortIntervalHStack';
import { ClickableText } from '@/components/atoms/ClickableText';
import { InputTextarea } from '@/components/atoms/InputTextarea';
import { ShortIntervalStack } from '@/components/atoms/ShortIntervalStack';
import { ColorCheckBox } from '@/components/atoms/ColorCheckBox';
import { CheckBox } from '@/components/atoms/CheckBox';
import { BlueButton } from '@/components/atoms/BlueButton';
import { WarningAlert } from '@/components/atoms/WarningAlert';
import { VariableNode } from 'graphql';

type Props = {
  inputText: string;
  textAreaOnChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  inputSampleText: () => void;
  submitButtonOnClick: (e: MouseEvent<HTMLButtonElement>) => void;
  checkBoxItems: boolean[];
  setCheckBoxItems: (value: SetStateAction<boolean[]>) => void;
  ruleNames: string[][];
  isNgAlertShow: boolean;
};

export const ProofreadingInputForm = ({
  inputText,
  textAreaOnChange,
  inputSampleText,
  submitButtonOnClick,
  checkBoxItems,
  setCheckBoxItems,
  ruleNames,
  isNgAlertShow,
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

  const bulkCheckboxSelect = (index: number, checked: boolean) => {
    const selectedIndex = ruleNames[index].map((name) => getIndex(name));
    setCheckBoxItems(
      checkBoxItems.map((item, i) =>
        selectedIndex.includes(i) ? checked : item,
      ),
    );
  };

  return (
    <BorderBox>
      <ShortIntervalHStack>
        <EditIcon mb={2}></EditIcon>
        <ClickableText
          onClick={inputSampleText}
          text={'サンプルテキストを入力'}
        ></ClickableText>
      </ShortIntervalHStack>
      <InputTextarea
        value={inputText}
        onChange={textAreaOnChange}
        placeholder="ここに文章を入力してください"
      ></InputTextarea>
      {isNgAlertShow && (
        <WarningAlert text="NGワードが含まれています！"></WarningAlert>
      )}
      <Tabs mt={10} minH="xs" variant="enclosed">
        <TabList>
          <Tab>表記ルール</Tab>
          <Tab>typoチェック</Tab>
          <Tab>文法チェック</Tab>
        </TabList>
        <TabPanels>
          {ruleNames.map((names, index) => (
            <TabPanel key={index}>
              <ShortIntervalStack>
                <ColorCheckBox
                  isChecked={getBulkCheckboxIsChecked(index)}
                  onChange={(e) => {
                    e.preventDefault();
                    bulkCheckboxSelect(index, e.target.checked);
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
              </ShortIntervalStack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <BlueButton onClick={submitButtonOnClick} text="送信"></BlueButton>
    </BorderBox>
  );
};
