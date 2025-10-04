import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name :"",
    email : "",
    contact: "",
    guardianContact: "",
    dept: "",
    address: "",
    year: "",
    feeStatus: false,
  });

  const [loading, setLoading] = useState(true);
  const [stuId, setStuId] = useState(null);

  // ✅ Extract stuId from JWT cookie
  useEffect(() => {
    
    // trigger one call so interceptor can catch invalid sessions
  axiosInstance.get("/auth/check").catch(err => console.log(err));

    const token = Cookies.get("token");
    if (!token) {
      navigate("/"); // not logged in
      return;
    }
    const decoded = jwtDecode(token);
    setStuId(decoded.userId);

    // Fetch profile
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/students/${decoded.userId}/profile`);
        setFormData({
          name : res.data.name || "",
          email : res.data.email || "",
          contact: res.data.contact || "",
          guardianContact: res.data.guardianContact || "",
          dept: res.data.dept || "",
          address: res.data.address || "",
          year: res.data.year || "",
          feeStatus: res.data.feeStatus || false,
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/students/${stuId}/profile`, {
    ...formData,
    });
      alert("Profile updated successfully ✅");
      navigate("/student-dashboard");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile ❌");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          {/* Contact */}
          <div>
            <label className="block font-semibold mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Guardian Contact */}
          <div>
            <label className="block font-semibold mb-1">Guardian Contact</label>
            <input
              type="text"
              name="guardianContact"
              value={formData.guardianContact}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block font-semibold mb-1">Department</label>
            <input
              type="text"
              name="dept"
              value={formData.dept}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Year */}
          <div>
            <label className="block font-semibold mb-1">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
        

          {/* Fee Status */}
          <div className="flex items-center">
            <input
                type="checkbox"
                name="feeStatus"
                checked={formData.feeStatus}
                disabled   
                className="mr-2 cursor-not-allowed"
            />
            <label className="font-semibold">Fee Paid</label>
        </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate("/student-dashboard")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
