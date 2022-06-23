import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function WifiDisplay({active, className}) {
    /* TODO Add Changing Icons depending on Input Value */
    return (
        <div className={`${className} ${!active && 'bg-red-100'}`}>
            <FontAwesomeIcon icon={solid('wifi')} className="items-center" />
        </div>
    )
}
