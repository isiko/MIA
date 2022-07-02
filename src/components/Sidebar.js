import React from 'react'
import { FaFire, FaDesktop, FaLaptop, FaMobileAlt } from 'react-icons/fa'

const Sidebar = function Sidebar() {
    return (
        <aside className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-red-800 text-white shadow-lg">
            <SidebarIcon text="asdf" icon={<FaFire size="28"/>} />
            <SidebarIcon text="asdf" icon={<FaDesktop size="28"/>} />
            <SidebarIcon text="asdf" icon={<FaLaptop size="28"/>} />
            <SidebarIcon text="asdf" icon={<FaMobileAlt size="28"/>} />
            {/* TODO Add Devices to Sidebar */}
        </aside>
    )
}

const SidebarIcon = ({ icon, text }) => (
    
    <div className="sidebar-icon group">
        { icon }

        <span class='sidebar-tooltip group-hover:scale-100'>
            { text }
        </span>
    </div>
)

export default Sidebar;