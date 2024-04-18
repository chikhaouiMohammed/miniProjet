import { useState } from "react";
import Admin from "./pages/AdminDashboard/Admin";
import { adminData } from "./Data/AdminLineChart";
import HotelSearch from "./pages/HotelSearch/HotelSearch";
import HotelOwner from "./pages/HotelOwner/HotelOwner";
import Landing from './pages/Landing'
import { hotelTotalRevenue } from "./Data/HotelOwnerData";
import SignUp from "./pages/SingUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Payment from './pages/Payment/Payment'
import User from "./pages/UserAccount/User";
import ChangePAssword from './components/ChangePassword'
import UserInfo from './components/UserInfo'
import Secretaire from './pages/SecretairePage.jsx/Secretaire'
import { Route, Routes } from "react-router-dom";



function App() {
  const [visitors, setVisitors] = useState({
    labels: adminData.map((data) => data.month),
    datasets: [{
      label: 'Total Hotel Visitors',
      data: adminData.map((data) => data.visitors),
      fill: true,
      borderColor: '#1b60e0',
      borderWidth: 5,
      tension: 0.4,
      pointBackgroundColor: 'purple',
      pointBorderWidth: 5
    }]
  }
  );
  
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<HotelOwner/>} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/register" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
