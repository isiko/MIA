import React from 'react'
import ConnectivityDisplay from './ConnectivityDisplay/ConnectivityDisplay'


export default function DeviceInformation() {
  return (
    <div className='ml-16 w-full'>
        {/* HEADER */}
        <div className='p-5 bg-gray-800 text-white flex items-center font-black'>
            <h1 className='text-4xl text-left inline pr-5'>Device Name</h1>
            <ConnectivityDisplay/>
        </div>
        
        {/* BODY */}
        <div className='p-5 font-semibold'>
          {/* Recent Activity */}
          <div class="grid grid-cols-2 gap-4 content-start text-center text-white">
            <div className='bg-purple-500 p-4 rounded'>Last Active: (Date)</div>
            <div className='bg-purple-500 p-4 rounded'>Last Action: (Action)</div>
            <div className='bg-purple-500 p-4 rounded'>Other Statistic</div>
            <div className='bg-purple-500 p-4 rounded'>More Data</div>
            <div className='bg-purple-500 p-4 rounded'>AAAA</div>
            <div className='bg-purple-500 p-4 rounded'>SO MUCH DATA</div>
            <div className='bg-purple-500 p-4 rounded'>THERE IS EVEN MORE</div>
          </div>
        </div>
        {/*
            - Activity
            - Available Actions
            - Configure Device in Application
        */}
    </div>
  )
}
