import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const COLOR_ERROR = "bg-orange-400"
const COLOR_RECIEVED = "bg-purple-800"
const COLOR_SENDT = "bg-purple-600"

const MESSAGE_FORMAT = "p-4 rounded flex flex-row space-x-5"

export default class MessageLog extends Component {

    constructor(props) {
        super(props)
        this.id = props.id
        this.state = {deviceLog: []}
    }

    componentDidMount() {
        let getData = () => {
            window.devices.getMessageLog(this.id).then((log) => {
                this.setState({deviceLog: log})
            })
        }

        this.interval = setInterval(() => getData(), 1000)
        getData()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getIcon(type) {
        return type === "recieved" ? <FontAwesomeIcon icon={solid("download")} /> : <FontAwesomeIcon icon={solid("upload")} />
    }

    render() {
        return (
            <div className='flex flex-col space-y-3 text-white w-[100%]'>
                {
                    this.state.deviceLog.slice().reverse().map((message, index) => {
                        let error = message.message === undefined || message.message.message === undefined || message.timestamp === undefined

                        if(error) {
                            return (
                                <div className={`${COLOR_ERROR} ${MESSAGE_FORMAT}`} key={index}>
                                    {this.getIcon(message.type)}
                                    <p>{JSON.stringify(message.message)}</p>
                                </div>
                            )
                        }

                        return (
                            <div className={`${message.type === "recieved" ? COLOR_RECIEVED : COLOR_SENDT} ${MESSAGE_FORMAT}`} key={index}>
                                {this.getIcon(message.type)}
                                <p>{message.pluginName}</p>
                                <p>{JSON.stringify(message.message.message)}</p>
                                <p>{new Date(message.timestamp).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}