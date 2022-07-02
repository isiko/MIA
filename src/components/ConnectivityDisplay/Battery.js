import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import ConnectionDisplayWrapper from './DisplayWrapper'

export default function BatteryDisplay({ active, className, percentage }) {
    return (
        <ConnectionDisplayWrapper className={className} active={active}>
            {
                percentage >= 0.90 ? <FontAwesomeIcon icon={solid('battery-full')} className="items-center" /> :
                percentage >= 0.75 ? <FontAwesomeIcon icon={solid('battery-three-quarters')} className="items-center" /> :
                percentage >= 0.50 ? <FontAwesomeIcon icon={solid('battery-half')} className="items-center" /> :
                percentage >= 0.25 ? <FontAwesomeIcon icon={solid('battery-quarter')} className="items-center" /> :
                <FontAwesomeIcon icon={solid('battery-empty')} className="items-center" />
            }
        </ConnectionDisplayWrapper>
    )
}