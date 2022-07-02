import React from 'react'

import BluetoothDisplay from './Bluetooth'
import WifiDisplay from './Wifi'
import SerialDisplay from './Serial'
import BatteryDisplay from './Battery'

export default function ConnectivityDisplay({className}) {
  let batteryPercent = 0.99
  return (
    <div className={`text-2xl text-center inline h-[100%] ${className}`}>
        <WifiDisplay active={true}/>
        <BluetoothDisplay active={true}/>
        <SerialDisplay active={false}/>
        <BatteryDisplay percentage={batteryPercent} active={true}/>
    </div>
  )
}
