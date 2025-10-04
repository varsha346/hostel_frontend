import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const UpdateNotice = () => {
  useEffect(() => {
    // trigger one call so interceptor can catch invalid sessions
   axiosInstance.get("/auth/check").catch(err => console.log(err));

  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch notice data on load
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axiosInstance.get(`/notices/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (err) {
        console.error("Error fetching notice:", err);
      }
    };
    fetchNotice();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/notices/update/${id}`, { title, description });
      navigate("/warden-dashboard"); // go back to dashboard
    } catch (err) {
      console.error("Error updating notice:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold">Update Notice</h2>
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Notice
        </button>
      </form>
    </div>
  );
};

export default UpdateNotice;
