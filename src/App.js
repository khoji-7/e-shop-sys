import './App.css';
import Sidebar from './components/sidebar/Sidebar.jsx';
import HeaderNav from './components/navbar/Navbar.jsx';
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/Home/homePage.jsx';
import AddUserPage from './pages/addUserPage/AddUserPage.jsx';

function App() {
 

  return (
    <div className="flex flex-row">
      {/* Yon panel */}
      <Sidebar />
      {/* Asosiy kontent */}
      <div className="flex-1 bg-[#f4f4f8] min-h-screen">
        {/* Header */}
        <HeaderNav />
        <div className="p-6">        
              <Routes>
                <Route path="/" element = {<HomePage/>} />  
                <Route path="/adduser" element = {<AddUserPage/>}/>
              </Routes>  
        </div>
      </div>
    </div>
  );
}

export default App;
