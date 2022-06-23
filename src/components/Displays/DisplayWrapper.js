import React, { Children } from 'react'

export default function ConnectionDisplayWrapper({children, active}) {
  return (
    <div className={`inline m-1 p-1 rounded-md ${!active ? 'bg-red-100 text-black' : 'text-white'}`}>
        {children}
    </div>
  )
}
