import React from 'react'

import Card from './components/Card'
import Nav from './components/Nav'
import { useGetData } from './hooks/useGetData'
import { Table } from './components/Table'

function App(): React.ReactNode {
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
          <h1 className="text-xl text-center">Table</h1>
          <Table data={data} />
        </Card>
      </main>
    </div>
  )
}

export default App
