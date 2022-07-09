import { React, Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {
    constructor(props){
        super(props)

        this.state = {
            devices: []
        }
    }

    componentDidMount(){
        window.devices.get().then((devices) => {
            this.setState({
                devices: devices
            })
        })
    }
    //TODO Make this Scrollable
    render() {
        return (
            <aside className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-red-900 text-white shadow-lg">
                <div className='flex h-[5rem] flex-col justify-center shrink-0'>
                    <NavLink to="settings" className={({ isActive }) => isActive ? "sidebar-icon-highlighted" : "sidebar-icon"}>
                        <FontAwesomeIcon icon={solid('gear')} className="w-[28px] h-[28px]" />
                    </NavLink>
                </div>
                <div className=''>
                    {
                        this.state.devices.map((device, index) => {
                            return <SidebarIcon icon={device.icon} text={device.name} id={index} key={index} />
                        })
                    }
                </div>
            </aside>
        )
    }
}

const SidebarIcon = function ({ icon, text, id}) {

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