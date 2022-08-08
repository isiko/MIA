import { Route, Routes, BrowserRouter, Navigate} from 'react-router-dom';
import { React, useState} from 'react'

import Sidebar from './components/Sidebar';
import DeviceInformation from './routes/DeviceInformation'
import Settings from './routes/Settings';

function DeviceRedirect() {
  const [id, setId] = useState({id:undefined});

  window.devices.get().then((devices) => {
    setId({id: Object.keys(devices)[0]})
  })

  return (
    <>
      {
        id.id === undefined ? <div>Loading</div> : <Navigate to={`/${id.id}`} replace={true} />
      }
    </>
  )
}

function App() {

  return (
    <div className="flex">
      <BrowserRouter>
        <Sidebar />
        <div className='ml-16 w-full bg-gray-900 min-h-screen'>
          <Routes>
            <Route path="/" element={<DeviceRedirect/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/:id" element={<DeviceInformation/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
