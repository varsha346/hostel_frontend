import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Student_Leave = () => {
  const [studentId, setStudentId] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    studentId: null,
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
  });

  // ✅ Decode JWT and extract userId from token
  useEffect(() => {
    const token = Cookies.get("token"); // read cookie
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const id = decoded.userId; // backend now sends userId in token
      if (!id) return;

      setStudentId(id);
      setFormData((prev) => ({ ...prev, studentId: id }));
      fetchLeaves(id);
    } catch (err) {
      console.error("❌ Invalid token:", err);
    }
  }, []);

  // ✅ Fetch leave history
  const fetchLeaves = async (id) => {
    try {
      const res = await axiosInstance.get(`/leaves/student/${id}`);
      setLeaves(res.data);
    } catch (err) {
      console.error("❌ Error fetching leaves:", err);
    }
  };

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Submit leave
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) return;

    try {
      const payload = { ...formData, studentId };
      await axiosInstance.post("/leaves/add", payload);

      // Reset form
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

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6">
      {/* Leave History */}
      <section className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">My Leave History</h2>
        <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto">
          {leaves.length === 0 ? (
            <p className="text-gray-500">No leaves applied yet.</p>
          ) : (
            leaves.map((leave) => (
              <div
                key={leave.leaveId}
                className="p-3 border rounded-md bg-blue-50 hover:bg-blue-100"
              >
                <p>
                  <span className="font-semibold">From:</span> {leave.startDate}
                </p>
                <p>
                  <span className="font-semibold">To:</span> {leave.endDate}
                </p>
                <p>
                  <span className="font-semibold">Reason:</span> {leave.reason}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
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
              </div>
            ))
          )}
        </div>
      </section>

      {/* Apply Leave Form */}
      <section className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 items-start">
          <div className="flex flex-col">
            <label className="font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="border rounded p-2"
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label className="font-medium">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="border rounded p-2"
              placeholder="Enter reason for leave"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Submit Leave
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Student_Leave;
