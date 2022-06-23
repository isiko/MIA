import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function BatteryDisplay({percentage}) {
    return (
        <div className='inline p-1 h-[100%]'>
            {
                percentage >= 0.90 ? <FontAwesomeIcon icon={solid('battery-full')} className="items-center" /> :
                percentage >= 0.75 ? <FontAwesomeIcon icon={solid('battery-three-quarters')} className="items-center" /> :
                percentage >= 0.50 ? <FontAwesomeIcon icon={solid('battery-half')} className="items-center" /> :
                percentage >= 0.25 ? <FontAwesomeIcon icon={solid('battery-quarter')} className="items-center" /> :
                <FontAwesomeIcon icon={solid('battery-empty')} className="items-center" />
            }
        </div>
    )
}