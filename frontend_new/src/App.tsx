import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentLeave from "./pages/student/Leave";
import StudentComplaints from "./pages/student/Complaints";
import StudentBooking from "./pages/student/Booking";
import StudentRooms from "./pages/student/Rooms";

// Warden Pages
import WardenDashboard from "./pages/warden/Dashboard";
import WardenBookings from "./pages/warden/Bookings";
import WardenLeaves from "./pages/warden/Leaves";
import WardenComplaints from "./pages/warden/Complaints";
import WardenRooms from "./pages/warden/Rooms";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route 
            path="/student/dashboard" 
            element={
              <ProtectedRoute requiredUserType="student">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/leave" 
            element={
              <ProtectedRoute requiredUserType="student">
                <StudentLeave />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/complaints" 
            element={
              <ProtectedRoute requiredUserType="student">
                <StudentComplaints />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/booking" 
            element={
              <ProtectedRoute requiredUserType="student">
                <StudentBooking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/rooms" 
            element={
              <ProtectedRoute requiredUserType="student">
                <StudentRooms />
              </ProtectedRoute>
            } 
          />

          {/* Warden Routes */}
          <Route 
            path="/warden/dashboard" 
            element={
              <ProtectedRoute requiredUserType="warden">
                <WardenDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/warden/bookings" 
            element={
              <ProtectedRoute requiredUserType="warden">
                <WardenBookings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/warden/leaves" 
            element={
              <ProtectedRoute requiredUserType="warden">
                <WardenLeaves />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/warden/complaints" 
            element={
              <ProtectedRoute requiredUserType="warden">
                <WardenComplaints />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/warden/rooms" 
            element={
              <ProtectedRoute requiredUserType="warden">
                <WardenRooms />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
