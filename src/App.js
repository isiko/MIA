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
    <div className="">
      <BrowserRouter>
        <div className='absulute left-0 top-0 ml-16 min-h-screen bg-gray-900'>
          <Routes>
            <Route path="/" element={<DeviceRedirect/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/:id" element={<DeviceInformation/>} />
          </Routes>
        </div>
        <Sidebar />
      </BrowserRouter>
    </div>
  );
}

export default App;
