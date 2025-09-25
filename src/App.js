import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import LoginSignup from "./pages/loginSignup";
import Student_Dashboard from "./pages/StudentDashboard";
import Student_Leave from "./pages/Student_Leave";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Student_Dashboard />} />
        <Route path="/apply-leave" element={<Student_Leave/>} />
        
      </Routes>
    </Router>
    
  );
}

export default App;



