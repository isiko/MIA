import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function BluetoothDisplay({active, className}) {
    /* TODO Add Changing Icons depending on Input Value */
    /* TODO Replace Icon with Bluetooth Symbol */
    return (
        <div className={`${className} ${!active && 'bg-red-100'}`}>
            <FontAwesomeIcon icon={solid('warning')} className="items-center" />
        </div>
    )
}