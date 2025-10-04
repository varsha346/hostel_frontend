import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const NoticeForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // trigger one call so interceptor can catch invalid sessions
    axiosInstance.get("/auth/check").catch(() => {});
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axiosInstance.post("/notices/create", {
        title,
        description,
      });
      setLoading(false);
      navigate("/warden-dashboard"); // go back to dashboard after creation
    } catch (err) {
      console.error("Error creating notice:", err);
      setError("Failed to create notice. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Notice</h1>
      <form
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded-md"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className={`bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Notice"}
        </button>
        <button
          type="button"
          className="mt-2 text-gray-600 underline"
          onClick={() => navigate("/warden-dashboard")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NoticeForm;
