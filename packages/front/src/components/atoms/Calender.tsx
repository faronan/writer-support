import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  selectedDate: Date;
  minDate?: Date;
  maxDate: Date;
  onChange: (date: Date) => void;
};

export const Calender = ({
  selectedDate,
  minDate = null,
  maxDate,
  onChange,
}: Props) => {
  return (
    <DatePicker
      dateFormat="yyyy/MM/dd"
      selected={selectedDate}
      minDate={minDate}
      maxDate={maxDate}
      onChange={onChange}
    />
  );
};
