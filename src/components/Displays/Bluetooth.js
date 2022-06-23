import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function BluetoothDisplay() {
    /* TODO Add Changing Icons depending on Input Value */
    /* TODO Replace Icon with Bluetooth Symbol */
    return (
        <div className='inline p-1'>
            <FontAwesomeIcon icon={solid('spaghetti-monster-flying')} className="items-center" />
        </div>
    )
}