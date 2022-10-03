import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import ConnectionDisplayWrapper from './DisplayWrapper'


export default class Battery extends Component {

    constructor(props){
        super(props)

        this.id = props.id
        this.state = {
            loaded: false
        }
    }

    componentDidUpdate(props){
        this.id = props.id
    }

    componentDidMount(){
        this.interval = setInterval(
            () => window.plugins.getData(this.id).then((plugins) => {
                let data = plugins.find((plugin) => plugin.pluginName === 'batteryStatus').data
                this.setState({
                    loaded: Object.keys(data).length > 0,
                    status: (Object.keys(data).length > 0 ? data : undefined)
                })
            }), 1000
        )
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }
    
    render() {
        return (
            !this.state.loaded ? null :
            <ConnectionDisplayWrapper title={this.state.status.percentage === undefined ? null : `${this.state.status.percentage}%`}>
                {
                    !this.state.status.batteryPowered || this.state.status.percentage === undefined ? <FontAwesomeIcon icon={solid('plug')} className="connectivity-icon" /> :
                    this.state.status.charging ? <FontAwesomeIcon icon={solid('plug-circle-bolt')} className="connectivity-icon" /> :
                    this.state.status.percentage >= 0.90 ? <FontAwesomeIcon icon={solid('battery-full')} className="connectivity-icon" /> :
                    this.state.status.percentage >= 0.75 ? <FontAwesomeIcon icon={solid('battery-three-quarters')} className="connectivity-icon" /> :
                    this.state.status.percentage >= 0.50 ? <FontAwesomeIcon icon={solid('battery-half')} className="connectivity-icon" /> :
                    this.state.status.percentage >= 0.25 ? <FontAwesomeIcon icon={solid('battery-quarter')} className="connectivity-icon" /> :
                        <FontAwesomeIcon icon={solid('battery-empty')} className="connectivity-icon" />
                }
            </ConnectionDisplayWrapper>
        )
    }
}