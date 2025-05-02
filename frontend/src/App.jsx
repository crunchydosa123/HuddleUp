import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/Loginpage";
import Signuppage from "./pages/Signup/Signuppage";
import Dashboardpage from "./pages/Dashboard/Dashboardpage";
import { UserProvider } from "./contexts/UserContext";
import Homepage from "./pages/Homepage/Homepage";


function App() {
    return (
        <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<Signuppage />} />
                <Route path="/dashboard" element={<Dashboardpage />} />
            </Routes>
        </BrowserRouter>
        </UserProvider>
    );
}

export default App;
