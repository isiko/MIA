import React, { Component } from 'react'

const COLORS = ['bg-purple-500', 'bg-purple-900']

export default class DeviceStats extends Component {

    constructor(props) {
        super(props)
        this.id = props.id
        this.state = {plugins: []}
    }

    componentDidMount() {
        let getData = () => {
            window.plugins.getData(this.id).then((plugins) => {
                this.setState({plugins: plugins})
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
            <div className="w-[100%] grid grid-flow-col auto-cols-fit gap-3 text-center text-white">
                {
                    this.state.plugins
                        .filter(p => p.stats !== undefined)
                        .map((plugin, pluginIndex) => {
                            let stats = []
                            plugin.stats.map((stat, index) => {
                                stats.push(<div className={`${COLORS[pluginIndex % COLORS.length]} p-4 rounded`} key={plugin.pluginName + stat.name}>{stat.name}: {stat.value}</div>)
                            })
                            return stats
                        })
                }
            </div>
        )
    }
}