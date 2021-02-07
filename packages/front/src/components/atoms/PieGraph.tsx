import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

type dataType = {
  name: string;
  value: number;
};

type Props = {
  data: dataType[];
};

export const PieGraph = ({ data }: Props) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8A2BE2'];

  const sum = data.reduce((sum, dict) => sum + dict.value, 0);
  const filterData = data.filter((dict) => dict.value / sum > 0.1);
  const otherValue =
    sum - filterData.reduce((sum, dict) => sum + dict.value, 0);
  const otherIncludeData = otherValue
    ? filterData.concat([
        {
          name: 'その他',
          value: otherValue,
        },
      ])
    : filterData;

  return (
    <ResponsiveContainer height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          data={otherIncludeData}
          startAngle={90}
          endAngle={-270}
          outerRadius={90}
          label
        >
          {otherIncludeData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
