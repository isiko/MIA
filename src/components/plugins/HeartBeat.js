import React, { Component } from 'react'

export default class HeartBeatPlugin extends Component {

    constructor (props) {
        super(props)
        this.id = props.id
        this.state = {}
    }
    
    componentDidMount() {
        let getData = () => {
            window.plugins.getData(this.id).then((plugins) => {
                this.setState(plugins.find((plugin) => plugin.pluginName === 'heartBeat').data)
            })
        }
        this.interval = setInterval(() => getData(), 1000)
        getData()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            this.state === {} && this.state.pingCounter > 0 ? null :
            <div className="min-w-fit text-white bg-purple-500 rounded-xl">
                <p className='text-center p-4 bg-purple-600 text-2xl rounded-xl'>Ping Statistics</p>
                <div className="grid grid-cols-1 gap-3 p-4">
                        <p className="text-center">Answered Pings: {(this.state.answeredCounter || 0)}</p>

                        {
                            this.state.pingTiming === undefined ? null :
                                <p className="text-center">Ping in MS: {this.state.pingTiming}ms</p>
                        }

                        {
                            this.state.pingCounter === undefined ? null :
                                <p className="text-center">Ping success Rate: {parseInt((this.state.successfulCounter || 0) / this.state.pingCounter * 100)}%</p>
                        }
                </div>
            </div>
        )
    }
}
