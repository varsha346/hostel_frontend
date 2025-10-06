import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Student_Leave = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    studentId: null,
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const id = decoded.userId;
      if (!id) return;

      setStudentId(id);
      setFormData((prev) => ({ ...prev, studentId: id }));
      fetchLeaves(id);
    } catch (err) {
      console.error("❌ Invalid token:", err);
    }
  }, []);

  const fetchLeaves = async (id) => {
    try {
      const res = await axiosInstance.get(`/leaves/student/${id}`);
      setLeaves(res.data);
    } catch (err) {
      console.error("❌ Error fetching leaves:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) return;

    try {
      const payload = { ...formData, studentId };
      await axiosInstance.post("/leaves/add", payload);

      setFormData({
        studentId,
        startDate: "",
        endDate: "",
        reason: "",
        status: "Pending",
      });

      fetchLeaves(studentId);
    } catch (err) {
      console.error("❌ Error applying leave:", err);
    }
  };

  const handleDelete = async (leaveId) => {
    try {
      await axiosInstance.delete(`/leaves/${leaveId}`);
      setLeaves((prev) => prev.filter((leave) => leave.leaveId !== leaveId));
    } catch (err) {
      console.error("❌ Error deleting leave:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate("/student-dashboard")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition font-semibold"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Leave Management</h1>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Leave History */}
        <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            🕒 My Leave History
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-72 overflow-y-auto">
            {leaves.length === 0 ? (
              <p className="text-gray-500 italic">No leaves applied yet.</p>
            ) : (
              leaves.map((leave) => (
                <div
                  key={leave.leaveId}
                  className="p-4 rounded-xl border bg-blue-50 border-blue-200 hover:shadow-md transition relative"
                >
                  <p>
                    <span className="font-medium text-gray-700">From:</span>{" "}
                    {leave.startDate}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">To:</span>{" "}
                    {leave.endDate}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Reason:</span>{" "}
                    {leave.reason}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        leave.status === "Approved"
                          ? "bg-green-500"
                          : leave.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </p>

                  <button
                    onClick={() => handleDelete(leave.leaveId)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                    title="Delete Leave"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Apply for Leave */}
        <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            📝 Apply for Leave
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 flex flex-col">
              <label className="font-medium text-gray-700 mb-1">Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 min-h-[80px] focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your reason for leave"
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              >
                Submit Leave
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Student_Leave;
