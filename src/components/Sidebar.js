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

    deviceCacheToArray(deviceCache){
        let devices = []
        for(let key in deviceCache){
            deviceCache[key].id = key
            devices.push(deviceCache[key])
        }
        return devices
    }

    componentDidMount(){
        window.devices.get().then((devices) => {
            this.setState({
                devices: this.deviceCacheToArray(devices)
            })
        })
        
        window.devices.onUpdate((_event, devices) => {
            this.setState({devices: this.deviceCacheToArray(devices)})
        })
    }

    render() {
        return (
            <aside className='absolute left-0 top-0'>
                <div className='fixed h-screen w-16 shadow-lg bg-red-900' />
                <div className='fixed h-screen overflow-y-scroll no-scrollbar'>
                    <div className='h-[5rem] flex flex-col justify-center'>
                        <NavLink to="settings" className={({ isActive }) => isActive ? "sidebar-icon-highlighted" : "sidebar-icon"}>
                            <FontAwesomeIcon icon={solid('gear')} className="w-[28px] h-[28px]" />
                        </NavLink>
                    </div>
                    {
                        this.state.devices.map((device, index) => {
                            return <SidebarIcon icon={device.icon} text={device.name} id={device.id} key={index} />
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
        <div className='flex flex-row items-center h-16 w-min pointer-events-none'>
            <NavLink
                to={String(id)}
                className={({ isActive }) => {
                    return "peer pointer-events-auto " + (isActive ? "sidebar-icon-highlighted" : "sidebar-icon")
                }}>
                {icons[icon]}
            </NavLink>
            <p className='sidebar-tooltip peer-hover:ml-2 peer-hover:p-2 peer-hover:w-min peer-hover:scale-100'> {text} </p>
        </div>
    )
}

export default Sidebar;