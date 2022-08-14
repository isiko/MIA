import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ConnectivityDisplay from '../components/ConnectivityDisplay/ConnectivityDisplay'
import Headline from '../components/Headline'
import HeartBeatPlugin from '../components/plugins/HeartBeat';
import MessageLog from '../components/MessageLog';
import DeviceStats from '../components/DeviceStats';

export default function DeviceInformation() {

  const { id } = useParams();
  const [device, setDevice] = useState({});

  window.devices.get().then((devices) => setDevice(devices[id]))

  return (
    <div>
      <Headline text={device.name}>
        <ConnectivityDisplay id={device.id}/>
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
