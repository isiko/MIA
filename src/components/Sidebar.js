import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const Sidebar = function Sidebar() {
    //TODO Make this Scrollable
    return (
        <aside className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-red-800 text-white shadow-lg">
            <div className='flex h-[5rem] flex-col justify-center shrink-0'>
                <div className='sidebar-icon-highlighted'>
                    <FontAwesomeIcon icon={solid('gear')} className="w-[28px] h-[28px]" size='28'/>
                </div>
            </div>
            <div className=''>
                <SidebarIcon text="asdf" icon={0} />
                <SidebarIcon text="asdf" icon={1} />
                <SidebarIcon text="asdf" icon={2} />
            </div>
            {/* TODO Add Devices to Sidebar */}
        </aside>
    )
}

const SidebarIcon = function ({ icon, text}) {

    text = "asdf"

    let icons = [
        <FontAwesomeIcon icon={solid('display')} className="w-[28px] h-[28px]" size='28'/>,         // Desktop  0
        <FontAwesomeIcon icon={solid('laptop')} className="w-[28px] h-[28px]" size='28'/>,          // Laptop   1
        <FontAwesomeIcon icon={solid('mobile-screen')} className="w-[28px] h-[28px]" size='28'/>    // Mobile   2
    ]
    
    return (
        <div className={`sidebar-icon group shrink-0`}>
            { icons[icon] }

            <span class='sidebar-tooltip group-hover:scale-100'> { text } </span>
        </div>
    )
}

export default Sidebar;