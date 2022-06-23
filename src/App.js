import './App.css';
import DeviceInformation from './components/DeviceInformation';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App mx-auto">
      <Sidebar/>
      <DeviceInformation/>
    </div>
  );
}

export default App;
