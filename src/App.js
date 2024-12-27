import './App.css';
import Sidebar from './components/sidebar/Sidebar.jsx';
import HeaderNav from './components/navbar/Navbar.jsx';
import Table from './components/table/Table.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';


function App() {
  return (
    <div className='flex flex-row'>
      <Sidebar/>
     <div className='bg-[#f4f4f8]' >
      <HeaderNav/>
      <div>
        <Dashboard/>
        <Table/>
      </div>
     </div>
    </div>
  );
}

export default App;
