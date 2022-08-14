import React from 'react'

import BluetoothDisplay from './Bluetooth'
import WifiDisplay from './Wifi'
import SerialDisplay from './Serial'
import BatteryDisplay from './Battery'

export default function ConnectivityDisplay({className, id}) {
  
  const [state, setState] = React.useState({activeConnections: []})

  window.devices.getConnectionStatus(id).then((connections) => {
    setState({ activeConnections: connections.activeConnections })
  })

  let batteryPercent = 0.99
  return (
    <div className={`text-2xl text-center inline h-[100%] ${className} flex`}>
        <WifiDisplay active={state.activeConnections.includes("lan")} />
        {/* <BluetoothDisplay active={false}/>
        <SerialDisplay active={false}/>
        <BatteryDisplay percentage={batteryPercent} active={false}/> */}
    </div>
  )
}
