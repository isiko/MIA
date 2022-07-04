import React from 'react'

export default function ConnectionDisplayWrapper({children, active}) {
  return (
    <div className={!active ? 'connectivity-wraper-active' : 'connectivity-wraper-inactive'}>
        {children}
    </div>
  )
}
