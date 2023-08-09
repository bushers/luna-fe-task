import React from 'react'
import { Link } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <header>
      <nav className="flex justify-center">
        <Link to="/" className="text-purple-400 underline px-4 py-2">
          Home
        </Link>
        <Link to="/about" className="text-purple-400 underline px-4 py-2">
          About
        </Link>
      </nav>
    </header>
  )
}

export default Nav
