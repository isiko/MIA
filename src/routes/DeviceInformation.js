import { React, useState } from 'react'
import { useParams } from 'react-router-dom';
import ConnectivityDisplay from '../components/ConnectivityDisplay/ConnectivityDisplay'
import Headline from '../components/Headline'
import HeartBeatPlugin from '../components/plugins/HeartBeat';
import MessageLog from '../components/MessageLog';
import DeviceStats from '../components/DeviceStats';

export default function DeviceInformation() {

  const { id } = useParams();

  return (
    <div>
      <Headline text={"Device Name"}>
        <ConnectivityDisplay />
      </Headline>

      <div className='p-5 font-semibold flex flex-col space-y-10 items-center w-[100%]'>
        <DeviceStats id={id} />

        <HeartBeatPlugin id={id}/>

        <MessageLog id={id}/>
      </div>
      {/*
            - Activity
            - Available Actions
            - Configure Device in Application
        */}
    </div>
  )
}
