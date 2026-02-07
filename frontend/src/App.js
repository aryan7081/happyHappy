import Login from "./modals/Login";
import Signup from "./modals/Signup";
import {AuthProvider} from "./context/AuthContext";
import { MembershipProvider } from "./context/MembershipContext";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import {GymDashboard} from "./components/layoutComponents/GymDashboard";
import { Header } from "./components/layoutComponents/Header";


function AppWrapper() {
  const location = useLocation();

  const hideHeader = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {!hideHeader && <Header />}
      <div className={!hideHeader ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/dashboard" element={<GymDashboard />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <MembershipProvider>
        <Router>
          <AppWrapper />
        </Router>
      </MembershipProvider>
    </AuthProvider>
  );
}

export default App;