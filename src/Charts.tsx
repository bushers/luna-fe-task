import React from 'react'

import Card from './components/Card'
import Nav from './components/Nav'
import { useGetData } from './hooks/useGetData'

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
          <h1 className="text-xl text-center">Charts</h1>
        </Card>
      </main>
    </div>
  )
}

export default Charts
