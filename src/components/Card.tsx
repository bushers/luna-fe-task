import React from 'react'

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="p-20 border shadow-xl border-gray-50 rounded-xl">
      {children}
    </div>
  )
}

export default Card
