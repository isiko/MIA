import React from 'react'
import ConnectivityDisplay from '../components/ConnectivityDisplay/ConnectivityDisplay'
import Headline from '../components/Headline'

export default function DeviceInformation() {
  return (
    <div>
        <Headline text={"Device Name"}>
          <ConnectivityDisplay/>
        </Headline>
        
        <div className='p-5 font-semibold '>
          {/* Recent Activity */}
          <div className="grid grid-cols-2 gap-4 content-start text-center text-white">
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
