import { FormControl, FormLabel, HStack } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { BorderBox } from '@/components/atoms/BorderBox';
import { Calender } from '@/components/atoms/Calender';

type Props = {
  startSelectedDate: Date;
  startOnChange: (date: Date) => void;
  endSelectedDate: Date;
  endOnChange: (date: Date) => void;
};

export const DateFilterInputForm = ({
  startSelectedDate,
  startOnChange,
  endSelectedDate,
  endOnChange,
}: Props) => {
  return (
    <BorderBox>
      <HStack>
        <FormControl>
          <FormLabel>開始日時</FormLabel>
          <CalendarIcon mr={3} mb={1} />
          <Calender
            selectedDate={startSelectedDate}
            maxDate={endSelectedDate}
            onChange={startOnChange}
          ></Calender>
        </FormControl>
        <FormControl>
          <FormLabel>終了日時</FormLabel>
          <CalendarIcon mr={3} mb={1} />
          <Calender
            selectedDate={endSelectedDate}
            minDate={startSelectedDate}
            maxDate={new Date()}
            onChange={endOnChange}
          ></Calender>
        </FormControl>
      </HStack>
    </BorderBox>
  );
};
