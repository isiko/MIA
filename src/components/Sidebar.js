import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NavLink } from 'react-router-dom'

const Sidebar = function Sidebar() {
    //TODO Make this Scrollable
    return (
        <aside className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-red-900 text-white shadow-lg">
            <div className='flex h-[5rem] flex-col justify-center shrink-0'>
                <NavLink to="settings" className={({ isActive }) => isActive ? "sidebar-icon-highlighted" : "sidebar-icon" }>
                        <FontAwesomeIcon icon={solid('gear')} className="w-[28px] h-[28px]" />
                </NavLink>
            </div>
            <div className=''>
                <SidebarIcon text="asdf" icon={0} id={0} />
                <SidebarIcon text="asdf" icon={1} id={1} />
                <SidebarIcon text="asdf" icon={2} id={2} />
            </div>
            {/* TODO Add Devices to Sidebar */}
        </aside>
    )
}

const SidebarIcon = function ({ icon, text, id}) {

    text = "asdf"

    let icons = [
        <FontAwesomeIcon icon={solid('display')} className="w-[28px] h-[28px]" />,         // Desktop  0
        <FontAwesomeIcon icon={solid('laptop')} className="w-[28px] h-[28px]" />,          // Laptop   1
        <FontAwesomeIcon icon={solid('mobile-screen')} className="w-[28px] h-[28px]" />    // Mobile   2
    ]
    
    return (
        <NavLink
            to={String(id)} 
            className={({ isActive }) => {
                return "group " + (isActive ? "sidebar-icon-highlighted" : "sidebar-icon")
            }}>
            { icons[icon] }

            <span className='sidebar-tooltip group-hover:scale-100'> { text } </span>
        </NavLink>
    )
}

export default Sidebar;