import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Student_Complaint = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Decode JWT to extract studentId
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const id = decoded.userId;
      if (!id) return;

      setStudentId(id);
      fetchComplaints(id);
    } catch (err) {
      console.error("❌ Invalid token:", err);
    }
  }, []);

  // ✅ Fetch complaints for logged-in student
  const fetchComplaints = async (id) => {
    try {
      const res = await axiosInstance.get(`/complaints/${id}`);
      setComplaints(res.data);
    } catch (err) {
      console.error("❌ Error fetching complaints:", err);
    }
  };

  // ✅ Submit new complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId || !subject.trim() || !description.trim()) return;

    try {
      await axiosInstance.post(`/complaints/${studentId}`, {
        subject,
        description,
        status: "Pending",
        date: new Date().toISOString(),
      });

      setSubject("");
      setDescription("");
      fetchComplaints(studentId);
    } catch (err) {
      console.error("❌ Error submitting complaint:", err);
    }
  };

  // ✅ Delete complaint
  const handleDelete = async (compId) => {
    try {
      await axiosInstance.delete(`/complaints/${compId}`);
      setComplaints((prev) => prev.filter((c) => c.compId !== compId));
    } catch (err) {
      console.error("❌ Error deleting complaint:", err);
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
        <h1 className="text-2xl font-bold text-gray-800">Complaint Management</h1>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Complaint History */}
        <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            📜 My Complaints
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-72 overflow-y-auto">
            {complaints.length === 0 ? (
              <p className="text-gray-500 italic">No complaints submitted yet.</p>
            ) : (
              complaints.map((comp) => (
                <div
                  key={comp.compId}
                  className="p-4 rounded-xl border bg-blue-50 border-blue-200 hover:shadow-md transition relative"
                >
                  <p>
                    <span className="font-medium text-gray-700">Subject:</span>{" "}
                    {comp.subject}
                  </p>
                  <p className="line-clamp-3">
                    <span className="font-medium text-gray-700">Description:</span>{" "}
                    {comp.description}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        comp.status === "RESOLVED"
                          ? "bg-green-500"
                          : comp.status === "REJECTED"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {comp.status}
                    </span>
                  </p>

                  <button
                    onClick={() => handleDelete(comp.compId)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                    title="Delete Complaint"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Submit Complaint Form */}
        <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            📝 Submit a Complaint
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                placeholder="Enter complaint subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Enter your complaint details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 min-h-[100px] focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Student_Complaint;
