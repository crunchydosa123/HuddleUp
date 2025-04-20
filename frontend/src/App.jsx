import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRedirect from "../components/AuthRedirect";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Login from "../components/Login";


function App() {
    return (
        <div><Login /></div>
    );
}

export default App;
