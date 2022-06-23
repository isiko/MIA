import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function SerialDisplay() {
    /* TODO Add Changing Icons depending on Input Value */
    return (
        <div className='inline p-1'>
            <FontAwesomeIcon icon={solid('mars-and-venus-burst')} className="items-center" />
        </div>
    )
}
