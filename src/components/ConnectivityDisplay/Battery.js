import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import ConnectionDisplayWrapper from './DisplayWrapper'

export default function BatteryDisplay({ className, percentage, pluggedin }) {
    return (
        <ConnectionDisplayWrapper className={className}>
            {
                pluggedin ? <FontAwesomeIcon icon={solid('plug')} className="connectivity-icon" /> :
                percentage >= 0.90 ? <FontAwesomeIcon icon={solid('battery-full')} className="connectivity-icon" /> :
                percentage >= 0.75 ? <FontAwesomeIcon icon={solid('battery-three-quarters')} className="connectivity-icon" /> :
                percentage >= 0.50 ? <FontAwesomeIcon icon={solid('battery-half')} className="connectivity-icon" /> :
                percentage >= 0.25 ? <FontAwesomeIcon icon={solid('battery-quarter')} className="connectivity-icon" /> :
                <FontAwesomeIcon icon={solid('battery-empty')} className="connectivity-icon" />
            }
        </ConnectionDisplayWrapper>
    )
}