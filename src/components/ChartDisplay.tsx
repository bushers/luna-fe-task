import { useMemo, useState } from 'react'
import { UserData } from '../hooks/useGetData'
import { SortKey, sortData } from './Table'
import { BarChart } from './BarChart'
import { Dropdown } from './Dropdown'
import { AreaChart } from './AreaChart'

type ChartDisplayProps = {
  data: UserData[]
}

const chartTypes = ['bar', 'area', 'line']
type ChartType = (typeof chartTypes)[number]

const dataLegendSelect = [
  'date_of_birth',
  'years_of_experience',
  'industry'
] as const
type DataType = (typeof dataLegendSelect)[number]

const ChartDisplay: React.FC<ChartDisplayProps> = ({ data }) => {
  const [chartToShow, setChartToShow] = useState<ChartType>('bar')
  const [dataTypeKey, setDataTypeKey] = useState<DataType>('date_of_birth')

  const dataToShow = useMemo(() => {
    return sortData(data, dataTypeKey as SortKey, 'asc')
  }, [data, dataTypeKey])

  const renderChart = (chart: ChartType) => {
    switch (chart) {
      case 'bar': {
        return <BarChart data={dataToShow} dataKey={dataTypeKey} />
      }
      case 'area': {
        return <AreaChart data={dataToShow} dataKey={dataTypeKey} />
      }
      case 'line': {
        return <div>Line</div>
      }
      default: {
        return <BarChart data={dataToShow} dataKey={dataTypeKey} />
      }
    }
  }
  return (
    <div>
      <div className="flex justify-center mb-4 items-end">
        <div className="mr-6">
          <Dropdown
            options={chartTypes}
            onSelect={(e) => setChartToShow(e as ChartType)}
            name="select-chart"
            label="Select chart type"
          />
        </div>
        <div>
          <p>{`Select data type`}</p>
          {dataLegendSelect.map((dataType) => {
            return (
              <button
                className={` mx-2 px-2 ${
                  dataType === dataTypeKey ? 'bg-green-300' : 'bg-slate-400'
                }`}
                onClick={() => setDataTypeKey(dataType)}
                key={dataType}
              >
                {dataType}
              </button>
            )
          })}
        </div>
      </div>
      {renderChart(chartToShow)}
    </div>
  )
}

export { ChartDisplay }
