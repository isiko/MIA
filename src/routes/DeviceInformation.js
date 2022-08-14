import { React, useState } from 'react'
import { useParams } from 'react-router-dom';
import ConnectivityDisplay from '../components/ConnectivityDisplay/ConnectivityDisplay'
import Headline from '../components/Headline'
import HeartBeatPlugin from '../components/plugins/HeartBeat';
import MessageLog from '../components/MessageLog';

export default function DeviceInformation() {

  const { id } = useParams();
  const [state, setState] = useState({ deviceLog: [], plugins: [] });

  window.plugins.getData(id).then((plugins) => {
    setState({ deviceLog: state.deviceLog, plugins: plugins })
  })

  return (
    <div>
      <Headline text={"Device Name"}>
        <ConnectivityDisplay />
      </Headline>

      <div className='p-5 font-semibold flex flex-col space-y-10 items-center w-[100%]'>
        {/* Recent Activity */}
        <div className="grid grid-cols-2 gap-3 content-start text-center text-white w-[100%]">
          {
            state.plugins.map((plugin) => {
              let stats = []
              if (plugin.stats !== undefined) {
                plugin.stats.map((stat, index) => {
                  stats.push(<div className='bg-purple-500 p-4 rounded' key={plugin.pluginName + index}>{stat.name}: {stat.value}</div>)
                })
                return stats
              }
            })
          }
        </div>

        <HeartBeatPlugin id={id}/>

        <MessageLog id={id}/>

        {/* Log */}

      </div>
      {/*
            - Activity
            - Available Actions
            - Configure Device in Application
        */}
    </div>
  )
}
