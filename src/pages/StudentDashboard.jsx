import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Student_Dashboard = () => {
  const navigate = useNavigate();

  const [roomType, setRoomType] = useState("All");
  const [rooms] = useState([
    { id: 1, number: "101", type: "Single" },
    { id: 2, number: "102", type: "Single" },
    { id: 3, number: "201", type: "Double" },
    { id: 4, number: "202", type: "Double" },
  ]);

  const [complaints] = useState([
    "Fan not working",
    "WiFi issue",
    "Leaking tap",
  ]);

  const [notices] = useState([
    "Hostel inspection tomorrow",
    "WiFi maintenance at 9 PM",
    "Mess closed on Sunday",
  ]);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {});
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/"); // redirect to landing/login
    }
  };

  const filteredRooms =
    roomType === "All" ? rooms : rooms.filter((room) => room.type === roomType);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* ---------------- HEADER ---------------- */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <div className="flex gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/profile")}
          >
            Edit Profile
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/apply-leave")}
          >
            Apply Leave
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/apply-complaint")}
          >
            Apply Complaint
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 grid grid-cols-3 gap-4 p-6">
        {/* -------- Notices -------- */}
        <section className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Recent Notices</h2>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {notices.map((notice, idx) => (
              <div
                key={idx}
                className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100"
              >
                {notice}
              </div>
            ))}
          </div>
        </section>

        {/* -------- Rooms -------- */}
        <section className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Available Rooms</h2>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="p-2 border rounded mb-4"
          >
            <option value="All">All</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
          </select>
          <div className="flex flex-wrap gap-3 overflow-y-auto">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="w-24 h-20 flex items-center justify-center border rounded-lg bg-blue-50 cursor-pointer hover:bg-blue-100"
                onClick={() => navigate(`/room/${room.id}`)}
              >
                {room.number}
              </div>
            ))}
          </div>
        </section>

        {/* -------- Complaints -------- */}
        <section className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Complaints Raised</h2>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {complaints.map((complaint, idx) => (
              <div
                key={idx}
                className="p-3 border rounded-md bg-red-50 hover:bg-red-100"
              >
                {complaint}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Student_Dashboard;
