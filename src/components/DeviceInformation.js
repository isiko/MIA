import React from 'react'
import BluetoothDisplay from './Displays/Bluetooth'
import WifiDisplay from './Displays/Wifi'
import SerialDisplay from './Displays/Serial'
import BatteryDisplay from './Displays/Battery'

export default function DeviceInformation() {
  let batteryPercent = 0.25
  return (
    <div>
        <div className='fixed right-0 top-0 w-[80vw] p-5 bg-gray-800'>
            <h1 className='text-4xl text-left w-[50%] inline pr-5'>Device Information</h1>
            <div className='text-2xl text-center w-[50%] inline'>
                <WifiDisplay className='inline m-1 p-1' active={false}/>
                <BluetoothDisplay className='inline m-1 p-1' active={false}/>
                <SerialDisplay className='inline m-1 p-1' active={false}/>
                <BatteryDisplay className='inline m-1 p-1' percentage={batteryPercent} active={false}/>
            </div>
        </div>
        {/*
            - Available Actions
            - Configure Device in Application
        */}
    </div>
  )
}
