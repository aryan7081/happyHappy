import React from 'react'

const Button = ({className, label}) => {
  return (
    <button className={`
   border border-gray-600 px-3 py-2 rounded-md font-normal bg-blue-500
   ${className}
  `}>{label}</button>
  )
}

export default Button
