import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
  Line
} from 'recharts'
import { UserData } from '../hooks/useGetData'

type LineChartProps = {
  data: UserData[]
  dataKey: string
}

const LineChart: React.FC<LineChartProps> = ({ data, dataKey }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart layout={'horizontal'} data={data}>
        <CartesianGrid vertical={false} horizontal={true} />
        <XAxis type="category" dataKey={dataKey} />
        <YAxis type="number" dataKey="salary" tickMargin={5} />

        <Line type="monotone" dataKey={'salary'} stroke="#8884d8" />
        <Tooltip />
        <Legend />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export { LineChart }
