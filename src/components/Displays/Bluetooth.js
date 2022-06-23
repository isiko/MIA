import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function BluetoothDisplay({active}) {
    /* TODO Add Changing Icons depending on Input Value */
    /* TODO Replace Icon with Bluetooth Symbol */
    if (active) {
        return (
            <div className='inline p-1'>
                <FontAwesomeIcon icon={solid('warning')} className="items-center" />
            </div>
        )
    }
    return null;
}