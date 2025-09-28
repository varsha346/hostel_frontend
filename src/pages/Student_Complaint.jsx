import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import { Trash2 } from "lucide-react";

const Student_Complaint = () => {
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
        date: new Date().toISOString(), // include date
      });

      // Reset form fields
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
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6">
      {/* Complaint History */}
      <section className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">My Complaints</h2>
        <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto">
          {complaints.length === 0 ? (
            <p className="text-gray-500">No complaints submitted yet.</p>
          ) : (
            complaints.map((comp) => (
              <div
                key={comp.compId}
                className="p-3 border rounded-md bg-blue-50 hover:bg-blue-100 relative"
              >
                <p>
                  <span className="font-semibold">Subject:</span> {comp.subject}
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {comp.description}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
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

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(comp.compId)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
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
      <section className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Submit a Complaint</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="border rounded p-2 w-full"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            className="border rounded p-2 w-full"
            placeholder="Enter your complaint..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Submit Complaint
          </button>
        </form>
      </section>
    </div>
  );
};

export default Student_Complaint;
