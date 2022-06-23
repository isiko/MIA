import React from 'react'
import BluetoothDisplay from './Displays/Bluetooth'
import WifiDisplay from './Displays/Wifi'
import SerialDisplay from './Displays/Serial'
import BatteryDisplay from './Displays/Battery'

export default function DeviceInformation() {
  let batteryPercent = 0.25
  return (
    <div className='ml-[20vw] p-10'>
        <div className=''>
            <h1 className='text-4xl text-left w-[50%] inline pr-5'>Device Information</h1>
            <div className='text-2xl text-center w-[50%] inline'>
                <WifiDisplay className='p-5' active={true}/>
                <BluetoothDisplay className='p-5' active={true}/>
                <SerialDisplay className='p-5' active={true}/>
                <BatteryDisplay className='p-5' percentage={batteryPercent} active={true}/>
            </div>
        </div>
        {/*
            - Battery
            - Connectivit
                - List of Connection Methods and their Status
                - General Device Connectivity
            - Available Actions
            - Configure Device in Application
        */}
    </div>
  )
}
