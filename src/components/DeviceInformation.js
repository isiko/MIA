import React from 'react'
import BluetoothDisplay from './Displays/Bluetooth'
import WifiDisplay from './Displays/Wifi'
import SerialDisplay from './Displays/Serial'
import BatteryDisplay from './Displays/Battery'

export default function DeviceInformation() {
  let batteryPercent = 0.25
  return (
    <div>
        <div className='fixed right-0 top-0 w-[80vw] p-5 bg-gray-800 text-white'>
            <h1 className='text-4xl text-left w-[50%] inline pr-5'>Device Information</h1>
            <div className='text-2xl text-center w-[50%] inline'>
                <WifiDisplay active={true}/>
                <BluetoothDisplay active={false}/>
                <SerialDisplay active={false}/>
                <BatteryDisplay percentage={batteryPercent} active={false}/>
            </div>
        </div>
        {/*
            - Available Actions
            - Configure Device in Application
        */}
    </div>
  )
}
