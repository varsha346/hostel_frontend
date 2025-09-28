import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Complaints = ({ role, studentId }) => {
  const [complaints, setComplaints] = useState([]);
  const [description, setDescription] = useState("");

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      let res;
      if (role === "student") {
        res = await axiosInstance.get(`/complaints/${studentId}`);
        setComplaints(res.data);
      } else {
        res = await axiosInstance.get("/complaints/all");
        setComplaints(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Add complaint (Student)
  const addComplaint = async () => {
    try {
      await axiosInstance.post("/complaints/add", {
        description,
        student: { stuId: studentId },
        status: "PENDING",
      });
      setDescription("");
      fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete complaint
  const deleteComplaint = async (id) => {
    try {
      await axiosInstance.delete(`/complaints/${id}`);
      fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  // Update complaint status (Warden only)
  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/complaints/${id}?status=${status}`);
      fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {role === "student" ? "My Complaints" : "All Complaints"}
      </h1>

      {/* Student Form */}
      {role === "student" && (
        <div className="mb-6">
          <textarea
            className="border p-2 w-full rounded-md"
            placeholder="Enter your complaint..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={addComplaint}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit Complaint
          </button>
        </div>
      )}

      {/* Complaints Table */}
      <table className="w-full border-collapse border border-gray-300 shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Status</th>
            {role === "warden" && <th className="border p-2">Student</th>}
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((comp) => (
            <tr key={comp.compId || comp.id} className="text-center">
              <td className="border p-2">{comp.compId || comp.id}</td>
              <td className="border p-2">{comp.description}</td>
              <td className="border p-2">{comp.status}</td>
              {role === "warden" && (
                <td className="border p-2">{comp.studentName}</td>
              )}
              <td className="border p-2 flex justify-center gap-2">
                {/* Delete button */}
                <button
                  onClick={() => deleteComplaint(comp.compId || comp.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>

                {/* Status Update for Warden */}
                {role === "warden" && (
                  <div className="flex gap-1">
                    <button
                      onClick={() =>
                        updateStatus(comp.compId, "IN_PROGRESS")
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => updateStatus(comp.compId, "RESOLVED")}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                    >
                      Resolve
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Complaints;
