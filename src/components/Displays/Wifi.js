import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function WifiDisplay({active}) {
    /* TODO Add Changing Icons depending on Input Value */
    if(active){
        return (
            <div className='inline p-1'>
                <FontAwesomeIcon icon={solid('wifi')} className="items-center" />
            </div>
        )
    }
    return null;
}
