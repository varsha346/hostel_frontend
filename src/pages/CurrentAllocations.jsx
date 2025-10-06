import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { DUMMY_ALLOCATIONS } from "../data/dummyHosteldata"; // <-- MOCK DATA IMPORTED

const CurrentAllocations = () => {
  const navigate = useNavigate();
  const [allocations, setAllocations] = useState([]);
  const [filters, setFilters] = useState({
    studentName: "",
    roomNo: "",
    year: "", // SE, TE, BE
  });
  const [loading, setLoading] = useState(false);

  // --- MOCKED FETCH ALLOCATIONS ---
  const fetchAllAllocations = async () => {
    console.log("Fetching ALL Allocations from DUMMY_DATA.");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAllocations(DUMMY_ALLOCATIONS);
    setLoading(false);
  };

  // --- MOCKED FETCH FILTERED ALLOCATIONS ---
  const fetchFilteredAllocations = async () => {
    console.log("Fetching FILTERED Allocations from DUMMY_DATA.");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filtered = DUMMY_ALLOCATIONS.filter((alloc) => {
      const nameMatch = filters.studentName
        ? alloc.user?.name.toLowerCase().includes(filters.studentName.toLowerCase())
        : true;
      const roomMatch = filters.roomNo
        ? alloc.room?.roomNo.includes(filters.roomNo)
        : true;
      const yearMatch = filters.year
        ? alloc.dept.toLowerCase() === filters.year.toLowerCase()
        : true;
      return nameMatch && roomMatch && yearMatch;
    });

    setAllocations(filtered);
    setLoading(false);
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
      fetchAllAllocations();
    }
  };

  const handleResetFilters = () => {
    setFilters({ studentName: "", roomNo: "", year: "" });
    fetchAllAllocations();
  };

  // --- UI ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/warden-dashboard")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg shadow transition"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
            🏠 Current Allocations
            <span className="text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
              Mocked Data
            </span>
          </h1>
        </div>

        <button
          onClick={() => navigate("/warden/allocations/history")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
        >
          View Allocation History
        </button>
      </header>

      {/* Filters Section */}
      <section className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            🔍 Filters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Student Name
            </label>
            <input
              type="text"
              name="studentName"
              value={filters.studentName}
              onChange={handleFilterChange}
              placeholder="Enter student name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Room No
            </label>
            <input
              type="text"
              name="roomNo"
              value={filters.roomNo}
              onChange={handleFilterChange}
              placeholder="Enter room number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Academic Year
            </label>
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All</option>
              <option value="SE">SE</option>
              <option value="TE">TE</option>
              <option value="BE">BE</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleApplyFilters}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
          >
            Apply Filters
          </button>
          <button
            onClick={handleResetFilters}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
          >
            Reset Filters
          </button>
        </div>
      </section>

      {/* Allocations Table */}
      <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        {loading ? (
          <p className="text-gray-500 italic">Loading allocations...</p>
        ) : allocations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-50 text-gray-700 font-semibold sticky top-0">
                <tr>
                  <th className="p-3 border-b">Student Name</th>
                  <th className="p-3 border-b">Room No</th>
                  <th className="p-3 border-b">Dept</th>
                  <th className="p-3 border-b">Contact</th>
                  <th className="p-3 border-b">Guardian Contact</th>
                  <th className="p-3 border-b">Address</th>
                  <th className="p-3 border-b">Contract End Date</th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((alloc, index) => (
                  <tr
                    key={alloc.stuId}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-3 border-b">{alloc.user?.name}</td>
                    <td className="p-3 border-b text-center">
                      {alloc.room?.roomNo}
                    </td>
                    <td className="p-3 border-b text-center">{alloc.dept}</td>
                    <td className="p-3 border-b text-center">{alloc.contact}</td>
                    <td className="p-3 border-b text-center">
                      {alloc.guardianContact}
                    </td>
                    <td className="p-3 border-b">{alloc.address}</td>
                    <td className="p-3 border-b text-center">
                      {alloc.contractEndDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">No current allocations found.</p>
        )}
      </section>
    </div>
  );
};

export default CurrentAllocations;
