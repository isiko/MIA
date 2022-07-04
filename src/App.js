import { Route, Routes, BrowserRouter, Navigate} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import DeviceInformation from './routes/DeviceInformation'
import Settings from './routes/Settings';

function App() {
  return (
    <div className="flex">
      <BrowserRouter>
        <Sidebar />
        <div className='ml-16 w-full bg-gray-900 min-h-screen'>
          <Routes>
            <Route path="/" element={<Navigate to="/0" replace={true}/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/:id" element={<DeviceInformation/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
