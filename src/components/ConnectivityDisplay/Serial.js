import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import ConnectionDisplayWrapper from './DisplayWrapper'

export default function SerialDisplay({ active, className }) {
    return (
        <ConnectionDisplayWrapper className={className} active={active}>
            <FontAwesomeIcon icon={brands('usb')} className="connectivity-icon" />
        </ConnectionDisplayWrapper>
    )
}
