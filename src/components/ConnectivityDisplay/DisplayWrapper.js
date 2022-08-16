import React from 'react'

export default function ConnectionDisplayWrapper({children, active}) {
  return (
    <div className={`connectivity-wraper ${active === undefined ? null : active ? 'connectivity-wraper-active' : 'connectivity-wraper-inactive'}`}>
        {children}
    </div>
  )
}
