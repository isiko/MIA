import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <aside className="fixed h-full left-0 top-0 p-10 w-[20vw] bg-red-800">
            <h1 className='text-xl text-black'>Sidebar Title</h1>
            {/* TODO Add Devices to Sidebar */}
        </aside>
    )
}
