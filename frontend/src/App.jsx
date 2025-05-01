import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AuthRedirect from "../components/AuthRedirect";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Login from "../components/Login";
import LoginPage from "./pages/Login/Loginpage";
import Signuppage from "./pages/Signup/Signuppage";
import Dashboardpage from "./pages/Dashboard/Dashboardpage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<>Home</>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<Signuppage />} />
                <Route path="/dashboard" element={<Dashboardpage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
