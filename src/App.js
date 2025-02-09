import "./App.css";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import HeaderNav from "./components/navbar/Navbar.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/Home/homePage.jsx";
import AddUserPage from "./pages/addUserPage/AddUserPage.jsx";
import CollectorPage from "./pages/Collector/CollectorPage.jsx";
import ZonePage from "./pages/zone/zonePage.jsx";
import CollectorMoney from "./pages/Collector/CollectorMoney.jsx";
import LoginPage from "./pages/login/loginPage.jsx";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (!storedToken) {
      navigate("/login");
    }
  }, [navigate]);

  if (!token) {
    return <LoginPage setToken={setToken} />;
  }

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-1 bg-[#f4f4f8] h-[100vh]">
        <HeaderNav />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/adduser" element={<AddUserPage />} />
            <Route path="/collector" element={<CollectorPage />} />
            <Route path="/zone" element={<ZonePage />} />
            <Route path="/collectormoney" element={<CollectorMoney />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
