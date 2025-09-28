import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Warden_Dashboard = () => {
  const navigate = useNavigate();

  // Leaves from backend
  const [leaves, setLeaves] = useState([]);

  // Complaints from backend
  const [complaints, setComplaints] = useState([]);

  // Notices from backend
  const [notices, setNotices] = useState([]);

  // Fetch all data on load
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

  // Handle status change for leaves
  const handleLeaveStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/leaves/${id}/status`, { status: newStatus });
      setLeaves((prev) => prev.map((l) => (l.leaveId === id ? { ...l, status: newStatus } : l)));
    } catch (err) {
      console.error("Error updating leave status:", err);
    }
  };

  // Handle status change for complaints
  const handleComplaintStatusChange = async (compId, newStatus) => {
    try {
      await axiosInstance.put(`/complaints/${compId}?status=${newStatus}`);
      setComplaints((prev) => prev.map((c) => (c.compId === compId ? { ...c, status: newStatus } : c)));
    } catch (err) {
      console.error("Error updating complaint status:", err);
    }
  };

  // Handle delete notice
  const handleDeleteNotice = async (id) => {
    try {
      await axiosInstance.delete(`/notices/delete/${id}`);
      setNotices((prev) => prev.filter((n) => n.noticeId !== id));
    } catch (err) {
      console.error("Error deleting notice:", err);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {});
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* ---------------- HEADER ---------------- */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Warden Dashboard</h1>
        <div className="flex gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/warden/allocations/history")}
          >
            Allocation History
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/warden/allocations/current")}
          >
            Current Allocation
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

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 p-6 space-y-6">
        {/* -------- Leaves Section -------- */}
        <section className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Leaves</h2>
          <div className="flex-1 space-y-3 overflow-y-auto max-h-80">
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

        {/* -------- Complaints Section -------- */}
        <section className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Complaints</h2>
          <div className="flex-1 space-y-3 overflow-y-auto max-h-80">
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

        {/* -------- Notices Section -------- */}
        <section className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Notices</h2>
          <div className="flex-1 space-y-4 max-h-80 overflow-y-auto">
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
      </main>
    </div>
  );
};

export default Warden_Dashboard;
