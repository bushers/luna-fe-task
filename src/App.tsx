import React from 'react'

import Card from './components/Card'
import Nav from './components/Nav'

function App(): React.ReactNode {
  return (
    <div>
      <Nav />

      <main>
        <Card>
          <p className="pb-3 text-2xl">Hello Vite + React + Tailwind CSS!</p>
          <p className="pt-3 pb-3">
            Edit{' '}
            <code className="border border-1 pl-1 pr-1 pb-0.5 pt-0.5 rounded border-purple-400 font-mono text-sm bg-purple-100 text-purple-900">
              src/App.tsx
            </code>{' '}
            and save to test HMR updates.
          </p>
        </Card>
      </main>
    </div>
  )
}

export default App
