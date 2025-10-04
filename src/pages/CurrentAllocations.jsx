import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const CurrentAllocations = () => {
  const navigate = useNavigate();
  const [allocations, setAllocations] = useState([]);
  const [filters, setFilters] = useState({
    studentName: "",
    roomNo: "",
    year: "", // SE, TE, BE
  });
  const [loading, setLoading] = useState(false);
 useEffect(() => {
    // trigger one call so interceptor can catch invalid sessions
    axiosInstance.get("/auth/check").catch(() => {});
  }, []);
  // Fetch all allocations initially
  const fetchAllAllocations = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/allocations/currentAll");
      setAllocations(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching all allocations:", err);
      setLoading(false);
    }
  };

  // Fetch filtered allocations
  const fetchFilteredAllocations = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.studentName.trim() !== "") params.studentName = filters.studentName;
      if (filters.roomNo.trim() !== "") params.roomNo = filters.roomNo;
      if (filters.year.trim() !== "") params.year = filters.year;

      const res = await axiosInstance.get("/api/allocations/current", { params });
      setAllocations(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching filtered allocations:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAllocations();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = () => {
    const anyFilter = Object.values(filters).some((val) => val.trim() !== "");
    if (anyFilter) {
      fetchFilteredAllocations();
    } else {
      fetchAllAllocations(); // No filters, show all
    }
  };

  const handleResetFilters = () => {
    setFilters({ studentName: "", roomNo: "", year: "" });
    fetchAllAllocations();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Current Allocations</h1>
        <button
          onClick={() => navigate("/warden/allocations/history")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          View Allocation History
        </button>
      </header>

      {/* Filters */}
      <section className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="font-bold text-xl mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={filters.studentName}
              onChange={handleFilterChange}
              placeholder="Enter student name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Room No</label>
            <input
              type="text"
              name="roomNo"
              value={filters.roomNo}
              onChange={handleFilterChange}
              placeholder="Enter room number"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Academic Year</label>
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              <option value="SE">SE</option>
              <option value="TE">TE</option>
              <option value="BE">BE</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleApplyFilters}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Apply Filters
          </button>
          <button
            onClick={handleResetFilters}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      </section>

      {/* Allocations Table */}
      <section className="bg-white p-4 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-gray-500">Loading allocations...</p>
        ) : allocations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Student Name</th>
                  <th className="border p-2">Room No</th>
                  <th className="border p-2">Dept</th>
                  <th className="border p-2">Contact</th>
                  <th className="border p-2">Guardian Contact</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Contract End Date</th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((alloc) => (
                  <tr key={alloc.stuId} className="hover:bg-gray-50">
                    <td className="border p-2">{alloc.user?.name}</td>
                    <td className="border p-2">{alloc.room?.roomNo}</td>
                    <td className="border p-2">{alloc.dept}</td>
                    <td className="border p-2">{alloc.contact}</td>
                    <td className="border p-2">{alloc.guardianContact}</td>
                    <td className="border p-2">{alloc.address}</td>
                    <td className="border p-2">{alloc.contractEndDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No current allocations found.</p>
        )}
      </section>
    </div>
  );
};

export default CurrentAllocations;
