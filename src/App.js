import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import LoginSignup from "./pages/loginSignup";
import Student_Dashboard from "./pages/StudentDashboard";
import Warden_Dashboard from "./pages/Warden_Dashboard";
import Student_Leave from "./pages/Student_Leave";
import EditProfile from "./pages/EditProfile";
import Complaints from "./pages/Student_Complaint";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/student-dashboard" element={<Student_Dashboard />} />
        <Route path="/apply-leave" element={<Student_Leave/>} />
        <Route path="/apply-complaint" element={<Complaints/>} />
        <Route path="/warden-dashboard" element={<Warden_Dashboard/>} />
        <Route path="/profile" element={<EditProfile/>} />

      </Routes>
    </Router>
    
  );
}

export default App;



