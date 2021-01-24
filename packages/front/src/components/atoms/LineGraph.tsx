import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

type dataType = {
  name: string;
  value: number;
};

type Props = {
  data: dataType[];
};

export const LineGraph = ({ data }: Props) => {
  return (
    <ResponsiveContainer height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Line type="monotone" dataKey="value" />
      </LineChart>
    </ResponsiveContainer>
  );
};
