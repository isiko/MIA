import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import ConnectionDisplayWrapper from './DisplayWrapper'

export default function WifiDisplay({active, className}) {
    /* TODO Add Changing Icons depending on Input Value */
    return (
        <ConnectionDisplayWrapper className={className} active={active}>
            <FontAwesomeIcon icon={solid('wifi')}/>
        </ConnectionDisplayWrapper>
    )
}
