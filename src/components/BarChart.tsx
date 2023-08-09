import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  XAxis,
  CartesianGrid,
  YAxis,
  Bar,
  Tooltip,
  Legend
} from 'recharts'
import { UserData } from '../hooks/useGetData'

type BarChartProps = {
  data: UserData[]
  dataKey: string
}

const BarChart: React.FC<BarChartProps> = ({ data, dataKey }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart layout={'horizontal'} data={data}>
        <CartesianGrid vertical={false} horizontal={true} />
        <XAxis type="category" dataKey={dataKey} />
        <YAxis type="number" dataKey="salary" tickMargin={5} />

        <Bar dataKey={'salary'} fill={'#0C3A84'} barSize={15}></Bar>
        <Tooltip />
        <Legend />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export { BarChart }
