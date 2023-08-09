import React from 'react'

import Card from './components/Card'
import Nav from './components/Nav'

function About(): React.ReactNode {
  return (
    <div>
      <Nav />

      <main>
        <Card>
          <div className="text-center">
            <h1 className="text-xl">About</h1>
          </div>
        </Card>
      </main>
    </div>
  )
}

export default About
