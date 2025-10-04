import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AllocationHistory = () => {
  const navigate = useNavigate();
  const [allocations, setAllocations] = useState([]);
  const [filters, setFilters] = useState({
    studentName: "",
    roomNo: "",
    year: "",
  });
useEffect(() => {
    // trigger one call so interceptor can catch invalid sessions
   axiosInstance.get("/auth/check").catch(err => console.log(err));

  }, []);
  const fetchAllocations = async () => {
    try {
      const params = { ...filters };
      if (!params.year) delete params.year;
      const res = await axiosInstance.get("/api/allocations/history", { params });
      setAllocations(res.data);
    } catch (err) {
      console.error("Error fetching allocation history:", err);
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    fetchAllocations();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Allocation History</h1>
        <button
          onClick={() => navigate("/warden/allocations/current")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          View Current Allocations
        </button>
      </header>

      {/* Filters */}
      <section className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="font-bold text-xl mb-4">Filters</h2>
        <div className="grid grid-cols-3 gap-4">
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
            <label className="block text-gray-600 mb-1">Year (e.g., 2025)</label>
            <input
              type="number"
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              placeholder="2025"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          onClick={applyFilters}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Apply Filters
        </button>
      </section>

      {/* Allocations Table */}
      <section className="bg-white p-4 rounded-lg shadow-lg">
        {allocations.length > 0 ? (
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
                  <th className="border p-2">Start Date</th>
                  <th className="border p-2">End Date</th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((alloc) => (
                  <tr key={alloc.stuId} className="hover:bg-gray-50">
                    <td className="border p-2">{alloc.user.name}</td>
                    <td className="border p-2">{alloc.room.roomNo}</td>
                    <td className="border p-2">{alloc.dept}</td>
                    <td className="border p-2">{alloc.contact}</td>
                    <td className="border p-2">{alloc.guardianContact}</td>
                    <td className="border p-2">{alloc.address}</td>
                    <td className="border p-2">{alloc.startDate}</td>
                    <td className="border p-2">{alloc.contractEndDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No allocation history found.</p>
        )}
      </section>
    </div>
  );
};

export default AllocationHistory;
