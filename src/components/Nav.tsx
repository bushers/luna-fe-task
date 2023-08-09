import React from 'react'
import { Link } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <header>
      <nav className="flex justify-center">
        <Link to="/" className="text-purple-400 underline p-4 text-xl">
          Table
        </Link>
        <Link to="/charts" className="text-purple-400 underline p-4 text-xl">
          Charts
        </Link>
      </nav>
    </header>
  )
}

export default Nav
