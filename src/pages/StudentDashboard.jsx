import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Student_Dashboard = () => {
  const navigate = useNavigate();

  const [roomType, setRoomType] = useState("All");
  const [rooms] = useState([
    { id: 1, number: "101", type: "Single" },
    { id: 2, number: "102", type: "Single" },
    { id: 3, number: "201", type: "Double" },
    { id: 4, number: "202", type: "Double" },
  ]);

  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);

  // Fetch complaints & notices
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axiosInstance.get("/complaints/all", { withCredentials: true });
        setComplaints(res.data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      }
    };

    const fetchNotices = async () => {
      try {
        const res = await axiosInstance.get("/notices/all", { withCredentials: true });
        setNotices(res.data);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      }
    };

    fetchComplaints();
    fetchNotices();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {});
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      navigate("/");
    }
  };

  const filteredRooms =
    roomType === "All" ? rooms : rooms.filter((room) => room.type === roomType);

  // Chart logic
  const last6Days = [...Array(6)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (5 - i));
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  });

  const complaintsCount = last6Days.map((dayLabel) =>
    complaints.filter(
      (c) =>
        new Date(c.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        }) === dayLabel
    ).length
  );

  const noticesCount = last6Days.map((dayLabel) =>
    notices.filter(
      (n) =>
        new Date(n.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        }) === dayLabel
    ).length
  );

  const chartData = {
    labels: last6Days,
    datasets: [
      {
        label: "Complaints",
        data: complaintsCount,
        backgroundColor: "rgba(255,99,132,0.6)",
      },
      {
        label: "Notices",
        data: noticesCount,
        backgroundColor: "rgba(54,162,235,0.6)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-50 to-white p-6">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
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

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Enquiries</h2>
          <p className="text-2xl font-bold">{complaints.length + notices.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Available Rooms</h2>
          <p className="text-2xl font-bold">{rooms.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Complaints Raised</h2>
          <p className="text-2xl font-bold">{complaints.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Notices</h2>
          <p className="text-2xl font-bold">{notices.length}</p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Notices */}
        <section className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="font-bold text-xl mb-4">Recent Notices</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <div
                  key={notice.noticeId}
                  className="p-3 border rounded-md bg-blue-50 hover:bg-blue-100"
                >
                  <h3 className="font-semibold">{notice.title}</h3>
                  <p className="text-gray-700">{notice.description}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {new Date(notice.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No notices found.</p>
            )}
          </div>
        </section>

        {/* Complaints */}
        <section className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="font-bold text-xl mb-4">Complaints Raised</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <div
                  key={complaint.id || complaint._id}
                  className="p-3 border rounded-md bg-red-50 hover:bg-red-100"
                >
                  {complaint.subject || complaint.title || "No Subject"}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No complaints found.</p>
            )}
          </div>
        </section>
      </div>

      {/* Rooms Section */}
      <section className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="font-bold text-xl mb-4">Available Rooms</h2>
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="p-2 border rounded mb-4 w-full"
        >
          <option value="All">All</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
        </select>
        <div className="flex flex-wrap gap-3">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="w-24 h-20 flex flex-col items-center justify-center border rounded-lg bg-green-50 cursor-pointer hover:bg-green-100"
              onClick={() => navigate(`/room/${room.id}`)}
            >
              <span className="font-semibold">{room.number}</span>
              <span className="text-sm text-gray-600">{room.type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="font-bold text-xl mb-4">Activity Last 6 Days</h2>
        <div className="h-64"> {/* Set fixed height */}
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

    </div>
  );
};

export default Student_Dashboard;
