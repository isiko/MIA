import { React, useState} from 'react'
import { useParams } from 'react-router-dom';
import ConnectivityDisplay from '../components/ConnectivityDisplay/ConnectivityDisplay'
import Headline from '../components/Headline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function DeviceInformation() {

  const { id } =  useParams();
  const [state, setState] = useState({deviceLog: [], plugins: []});

  window.devices.getMessageLog(id).then((log) => {
    setState({deviceLog: log, plugins: state.plugins})
  })

  window.plugins.getData(id).then((plugins) => {
    setState({deviceLog: state.deviceLog, plugins: plugins})
  })

  let heatBeatPluginData = () => {
    let heartBeatplugin = state.plugins.find((plugin) => plugin.pluginName === 'heartBeat')

    return (heartBeatplugin === undefined ? null :
      <div className="min-w-fit text-white bg-purple-500 p-4 rounded">
        <div className="grid grid-cols-2 gap-3 ">
          <p className="text-right">Answered Pings</p>
          <p className="text-left">{heartBeatplugin.data.answeredCounter}</p>

          <p className="text-right">Ping in MS</p>
          <p className="text-left">{heartBeatplugin.data.pingTiming}ms</p>

          <p className="text-right">Ping success Rate</p>
          <p className="text-left">{parseInt(heartBeatplugin.data.successfulCounter / heartBeatplugin.data.pingCounter * 100)}%</p>

        </div>
      </div>)

  }

  return (
    <div>
        <Headline text={"Device Name"}>
          <ConnectivityDisplay/>
        </Headline>
        
        <div className='p-5 font-semibold flex flex-col space-y-10 items-center w-[100%]'>
          {/* Recent Activity */}
          <div className="grid grid-cols-2 gap-3 content-start text-center text-white w-[100%]">
            {
              state.plugins.map((plugin) => {
                let stats = []
                if (plugin.stats !== undefined){
                  plugin.stats.map((stat, index) => {
                    stats.push(<div className='bg-purple-500 p-4 rounded' key={plugin.pluginName + index}>{stat.name}: {stat.value}</div>)
                  })
                  return stats
                }
              })
            }
          </div>

          {
            heatBeatPluginData() !== undefined ? heatBeatPluginData() : null
          }

          {/* Log */}
          <div className='font-semibold flex flex-col space-y-3 text-white w-[100%]'>
          {
            state.deviceLog.slice().reverse().map((message, index) => {
              try {
                return (
                  <div className={`w-[100%] ${message.type === "recieved" ? "bg-purple-800" : "bg-purple-600"} p-4 rounded flex flex-row `} key={index}>
                    <div className='flex flex-row space-x-5'>
                      {message.type === "recieved" ? <FontAwesomeIcon icon={solid("download")} /> : <FontAwesomeIcon icon={solid("upload")} />}
                      <p>{message.pluginName}</p>
                      <p>{JSON.stringify(message.message.message)}</p>
                      <p>{new Date(message.timestamp).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</p>
                    </div>
                  </div>
                )
              } catch (e) {
                return (
                  <div className={`w-[100%] bg-orange-400 p-4 rounded flex flex-row `} key={index}>
                    <div className='pr-5'>
                      {message.type === "recieved" ? <FontAwesomeIcon icon={solid("download")} /> : <FontAwesomeIcon icon={solid("upload")} />}
                    </div>
                    <p>{JSON.stringify(message.message)}</p>
                  </div>
                )
              }
            })
          }
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
