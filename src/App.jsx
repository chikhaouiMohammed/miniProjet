import { useContext, useState } from "react";
import Admin from "./pages/AdminDashboard/Admin";
import { adminData } from "./Data/AdminLineChart";
import HotelSearch from "./pages/HotelSearch/HotelSearch";
import HotelOwner from "./pages/HotelOwner/HotelOwner";
import Landing from './pages/Landing'
import { hotelTotalRevenue } from "./Data/HotelOwnerData";
import SignUp from "./pages/SingUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import User from "./pages/UserAccount/User";
import ChangePAssword from './components/ChangePassword'
import UserInfo from './components/UserInfo'
import Secretaire from './pages/SecretairePage.jsx/Secretaire'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import NewUser from "./pages/User/NewUser";

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
  });

  const { currentUser, role } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const RequireRole = ({ children, requiredRole }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    if (role !== requiredRole) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Secretaire/>} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />

          <Route path="/Secretaire/NewUser" element={<NewUser/>} />
          <Route path="/hotel-search" element={<RequireAuth><RequireRole requiredRole='guest'><HotelSearch /></RequireRole></RequireAuth>} />
          <Route path="/hotel-owner" element={<RequireAuth><RequireRole requiredRole="hotel-owner"><HotelOwner /></RequireRole></RequireAuth>} />
          <Route path="/hotel-secreter" element={<RequireAuth><RequireRole requiredRole="hotel-secreter"><Secretaire /></RequireRole></RequireAuth>} />
          <Route path="/admin" element={<RequireAuth><RequireRole requiredRole="admin"><Admin chartData={visitors} /></RequireRole></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
