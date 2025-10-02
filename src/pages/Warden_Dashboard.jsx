import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const Warden_Dashboard = () => {
  const navigate = useNavigate();

  const [leaves, setLeaves] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axiosInstance.get("/leaves/all", { withCredentials: true });
        setLeaves(res.data);
      } catch (err) {
        console.error("Error fetching leaves:", err);
      }
    };

    const fetchComplaints = async () => {
      try {
        const res = await axiosInstance.get("/complaints/all", { withCredentials: true });
        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    const fetchNotices = async () => {
      try {
        const res = await axiosInstance.get("/notices/all", { withCredentials: true });
        setNotices(res.data);
      } catch (err) {
        console.error("Error fetching notices:", err);
      }
    };

    fetchLeaves();
    fetchComplaints();
    fetchNotices();
  }, []);

  const handleLeaveStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/leaves/${id}/status`, { status: newStatus });
      setLeaves((prev) => prev.map((l) => (l.leaveId === id ? { ...l, status: newStatus } : l)));
    } catch (err) {
      console.error("Error updating leave status:", err);
    }
  };

  const handleComplaintStatusChange = async (compId, newStatus) => {
    try {
      await axiosInstance.put(`/complaints/${compId}?status=${newStatus}`);
      setComplaints((prev) => prev.map((c) => (c.compId === compId ? { ...c, status: newStatus } : c)));
    } catch (err) {
      console.error("Error updating complaint status:", err);
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      await axiosInstance.delete(`/notices/delete/${id}`);
      setNotices((prev) => prev.filter((n) => n.noticeId !== id));
    } catch (err) {
      console.error("Error deleting notice:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {});
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      navigate("/");
    }
  };

  // ---- Chart logic (reuse student style) ----
  const last6Days = [...Array(6)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (5 - i));
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  });

  const complaintsCount = last6Days.map((dayLabel) =>
    complaints.filter(
      (c) =>
        new Date(c.date || c.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        }) === dayLabel
    ).length
  );

  const leavesCount = last6Days.map((dayLabel) =>
    leaves.filter(
      (l) =>
        new Date(l.startDate).toLocaleDateString("en-GB", {
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
        label: "Leaves",
        data: leavesCount,
        backgroundColor: "rgba(54,162,235,0.6)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-50 to-white p-6">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Warden Dashboard</h1>
        <div className="flex gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/warden/allocations")}
          >
            Allocations
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/warden/rooms")}
          >
            Rooms
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/warden/notices/create")}
          >
            Add Notice
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
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Leaves</h2>
          <p className="text-2xl font-bold">{leaves.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Complaints</h2>
          <p className="text-2xl font-bold">{complaints.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Notices</h2>
          <p className="text-2xl font-bold">{notices.length}</p>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Leaves Section */}
        <section className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="font-bold text-xl mb-4">Leaves</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <div key={leave.leaveId} className="p-3 border rounded-md bg-blue-50 hover:bg-blue-100">
                  <p><b>Student:</b> {leave.studentName}</p>
                  <p><b>From:</b> {leave.startDate}</p>
                  <p><b>To:</b> {leave.endDate}</p>
                  <p><b>Reason:</b> {leave.reason}</p>
                  <select
                    value={leave.status}
                    onChange={(e) => handleLeaveStatusChange(leave.leaveId, e.target.value)}
                    className="mt-2 p-2 border rounded-md w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No leave applications found.</p>
            )}
          </div>
        </section>

        {/* Complaints Section */}
        <section className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="font-bold text-xl mb-4">Complaints</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {complaints.length > 0 ? (
              complaints.map((c) => (
                <div key={c.compId} className="p-3 border rounded-md bg-red-50 hover:bg-red-100">
                  <p><b>Student:</b> {c.studentName}</p>
                  <p><b>Subject:</b> {c.subject}</p>
                  <p><b>Description:</b> {c.description}</p>
                  <p><b>Date:</b> {c.date}</p>
                  <select
                    value={c.status}
                    onChange={(e) => handleComplaintStatusChange(c.compId, e.target.value)}
                    className="mt-2 p-2 border rounded-md w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No complaints found.</p>
            )}
          </div>
        </section>
      </div>

      {/* Notices Section */}
      <section className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="font-bold text-xl mb-4">Notices</h2>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div
                key={notice.noticeId}
                className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-start hover:shadow-lg transition"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{notice.title}</h3>
                  <p className="text-gray-700 mb-1">{notice.description}</p>
                  <p className="text-gray-400 text-sm">{new Date(notice.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => navigate(`/warden/notices/update/${notice.noticeId}`)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteNotice(notice.noticeId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No notices found.</p>
          )}
        </div>
      </section>
      {/* Charts */}
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="font-bold text-xl mb-4">Activity Last 6 Days</h2>
          <div className="h-64">
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="font-bold text-xl mb-4">Complaints Analysis</h2>
          <div className="h-80 flex items-center justify-center">
            <Pie
              data={{
                labels: ["Pending", "Processing", "Resolved", "Rejected"],
                datasets: [
                  {
                    label: "Complaints",
                    data: [
                      complaints.filter((c) => c.status?.toLowerCase() === "pending").length,
                      complaints.filter((c) => c.status?.toLowerCase() === "processing").length,
                      complaints.filter((c) => c.status?.toLowerCase() === "resolved").length,
                      complaints.filter((c) => c.status?.toLowerCase() === "rejected").length,
                    ],
                    backgroundColor: [
                      "rgba(255, 206, 86, 0.6)", 
                      "rgba(54, 162, 235, 0.6)", 
                      "rgba(75, 192, 192, 0.6)", 
                      "rgba(255, 99, 132, 0.6)", 
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warden_Dashboard;
