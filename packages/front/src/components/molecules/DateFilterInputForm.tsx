import { ChangeEvent } from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { ShortIntervalHStack } from '@/components/atoms/ShortIntervalHStack';
import { BorderBox } from '@/components/atoms/BorderBox';
import { Calender } from '@/components/atoms/Calender';

type Props = {
  startSelectedDate: Date;
  startOnChange: (date: Date) => void;
  endSelectedDate: Date;
  endOnChange: (date: Date) => void;
  selectedUser: string;
  selectOnChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectOptions: string[];
};

export const DateFilterInputForm = ({
  startSelectedDate,
  startOnChange,
  endSelectedDate,
  endOnChange,
  selectedUser,
  selectOnChange,
  selectOptions,
}: Props) => {
  return (
    <BorderBox>
      <ShortIntervalHStack>
        <FormControl>
          <FormLabel>開始日</FormLabel>
          <CalendarIcon mr={3} mb={1} />
          <Calender
            selectedDate={startSelectedDate}
            maxDate={endSelectedDate}
            onChange={startOnChange}
          ></Calender>
        </FormControl>
        <FormControl>
          <FormLabel>終了日</FormLabel>
          <CalendarIcon mr={3} mb={1} />
          <Calender
            selectedDate={endSelectedDate}
            minDate={startSelectedDate}
            maxDate={new Date()}
            onChange={endOnChange}
          ></Calender>
        </FormControl>
      </ShortIntervalHStack>
      <FormControl mt={5}>
        <FormLabel>対象のユーザー</FormLabel>
        <Select
          value={selectedUser}
          onChange={selectOnChange}
          placeholder="指定なし"
        >
          {selectOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>
    </BorderBox>
  );
};
