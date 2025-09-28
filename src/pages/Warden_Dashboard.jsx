import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Warden_Dashboard = () => {
  const navigate = useNavigate();

  // Leaves from backend
  const [leaves, setLeaves] = useState([]);

  // Dummy complaints (replace with API later)
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      studentName: "Karan",
      subject: "Water Issue",
      description: "No water supply in washroom",
      date: "2025-09-19",
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Sneha",
      subject: "Food Quality",
      description: "Mess food is not fresh",
      date: "2025-09-18",
      status: "Processing",
    },
  ]);

  // ✅ Fetch leaves on load
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axiosInstance.get("/leaves/all", {
          withCredentials: true,
        });
        setLeaves(res.data);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeaves();
  }, []);

  // ✅ Handle status change for leaves
  const handleLeaveStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/leaves/${id}/status`, { status: newStatus });
      setLeaves((prev) =>
        prev.map((l) => (l.leaveId === id ? { ...l, status: newStatus } : l))
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  // ✅ Handle status change for complaints
  const handleComplaintStatusChange = (id, newStatus) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
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
        </div>
      </header>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 grid grid-cols-2 gap-4 p-6">
        {/* -------- Leaves Section -------- */}
        <section className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Leaves</h2>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <div
                  key={leave.leaveId}
                  className="p-3 border rounded-md bg-blue-50 hover:bg-blue-100"
                >
                  <p>
                    <b>Student:</b> {leave.studentName}
                  </p>
                  <p>
                    <b>From:</b> {leave.startDate}
                  </p>
                  <p>
                    <b>To:</b> {leave.endDate}
                  </p>
                  <p>
                    <b>Reason:</b> {leave.reason}
                  </p>
                  <select
                    value={leave.status}
                    onChange={(e) =>
                      handleLeaveStatusChange(leave.leaveId, e.target.value)
                    }
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
          <div className="flex-1 space-y-3 overflow-y-auto">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="p-3 border rounded-md bg-red-50 hover:bg-red-100"
              >
                <p>
                  <b>Student:</b> {c.studentName}
                </p>
                <p>
                  <b>Subject:</b> {c.subject}
                </p>
                <p>
                  <b>Description:</b> {c.description}
                </p>
                <p>
                  <b>Date:</b> {c.date}
                </p>
                <select
                  value={c.status}
                  onChange={(e) =>
                    handleComplaintStatusChange(c.id, e.target.value)
                  }
                  className="mt-2 p-2 border rounded-md w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Warden_Dashboard;
