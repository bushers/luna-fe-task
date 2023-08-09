import React from 'react'

import Card from './components/Card'
import Nav from './components/Nav'
import { useGetData } from './hooks/useGetData'
import { ChartDisplay } from './components/ChartDisplay'

function Charts(): React.ReactNode {
  const { isLoading, error, data } = useGetData('/MOCK_DATA.json')

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{`An error has occurred: ${error}`}</div>
  }

  if (!data) {
    return <div>No data</div>
  }

  return (
    <div>
      <Nav />

      <main>
        <Card>
          <div className="text-center">
            <h1 className="text-xl">Charts</h1>

            <ChartDisplay data={data} />
          </div>
        </Card>
      </main>
    </div>
  )
}

export default Charts
