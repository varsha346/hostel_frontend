import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import LoginSignup from "./pages/loginSignup";
import Student_Dashboard from "./pages/StudentDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Student_Dashboard />} />
      </Routes>
    </Router>
    
  );
}

export default App;



