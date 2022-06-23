import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import ConnectionDisplayWrapper from './DisplayWrapper'

export default function BluetoothDisplay({active, className}) {
    /* TODO Add Changing Icons depending on Input Value */
    /* TODO Replace Icon with Bluetooth Symbol */
    return (
        <ConnectionDisplayWrapper className={className} active={active}>
            <FontAwesomeIcon icon={brands('bluetooth-b')} className="items-center" />
        </ConnectionDisplayWrapper>
    )
}