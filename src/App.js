import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import LoginSignup from "./pages/loginSignup";
import Student_Dashboard from "./pages/StudentDashboard";
import Warden_Dashboard from "./pages/Warden_Dashboard";
import Student_Leave from "./pages/Student_Leave";
import EditProfile from "./pages/EditProfile";
import Student_Complaint from "./pages/Student_Complaint";
import NoticeForm from "./pages/NoticeForm";
import UpdateNotice from "./pages/updateNotice";
import RoomsPage from "./pages/RoomsPage";
import RoomDetailPage from "./pages/RoomDetails";
import PaymentPage from "./pages/PaymentPage";
import CurrentAllocations from "./pages/CurrentAllocations";
import AllocationHistory from "./pages/AllocationHistory";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/student-dashboard" element={<Student_Dashboard />} />
        <Route path="/apply-leave" element={<Student_Leave />} />
        <Route path="/apply-complaint" element={<Student_Complaint />} />
        <Route path="/warden-dashboard" element={<Warden_Dashboard />} />
        <Route path="/warden/notices/create" element={<NoticeForm />} />
        <Route path="/warden/notices/update/:id" element={<UpdateNotice />} />
        <Route path="/warden/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:roomNo" element={<RoomDetailPage />} />
        <Route path="/payment/:roomNo" element={<PaymentPage />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/warden/allocations" element={<CurrentAllocations />} />
        <Route path="/warden/allocations/history" element={<AllocationHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

