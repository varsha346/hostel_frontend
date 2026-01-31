import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { FaRegCommentDots } from "react-icons/fa";
import Cookies from "js-cookie";
import { jwtDecode} from "jwt-decode";
function RoomDetailPage() {
  const { roomNo } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [studentId, setStudentId] = useState(null);

  // ✅ Load studentId from cookie and fetch room details
 // ✅ Load studentId from JWT token and fetch room details
useEffect(() => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const id = decoded.userId;
      if (id) {
        setStudentId(id);
        console.log("✅ Student ID from token:", id);
      } else {
        console.warn("⚠️ No userId found inside token");
      }
    } catch (err) {
      console.error("❌ Invalid token:", err);
    }
  } else {
    console.warn("⚠️ No token found in cookies");
  }

  axiosInstance
    .get(`/rooms/${roomNo}`)
    .then((res) => setRoom(res.data))
    .catch((err) => console.error("Error fetching room details:", err));
}, [roomNo]);


  // ✅ Fetch all reviews for this room
  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get(`/api/reviews/room/${roomNo}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // ✅ Handle adding a new review
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    if (!studentId) {
      alert("Student not logged in or ID missing!");
      return;
    }

    try {
      const reviewData = { comment: newReview, rating: 5 }; // adjust as per your model
      console.log("Posting review:", reviewData, "for room:", roomNo, "student:", studentId);
      await axiosInstance.post(`/api/reviews/add/${roomNo}/${studentId}`, reviewData);
      setNewReview("");
      fetchReviews();
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  // ✅ Fetch reviews whenever panel opens
  useEffect(() => {
    if (showReviews) fetchReviews();
  }, [showReviews]);

  if (!room)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-blue-50 to-white">
        <p className="text-xl font-semibold">Loading Room Details...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-50 to-white p-6 flex flex-col items-center relative pb-20">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl w-full relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/student-dashboard")}
          className="absolute top-4 left-4 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Room {room.roomNo}
        </h2>

        {/* Room Image */}
        <div className="w-full h-64 mb-4 rounded-2xl overflow-hidden shadow-lg">
          {room.photos && room.photos.length > 0 ? (
            <img
              src={room.photos[0]}
              alt={`Room ${room.roomNo}`}
              className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg">
              No Image
            </div>
          )}
        </div>

        {/* Room Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg shadow-inner">
            <p className="text-gray-600 text-sm">Capacity</p>
            <p className="text-lg font-semibold">{room.size}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-inner">
            <p className="text-gray-600 text-sm">Occupied</p>
            <p className="text-lg font-semibold">{room.currOccu}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-inner col-span-2">
            <p className="text-gray-600 text-sm">Price</p>
            <p className="text-lg font-semibold">₹{room.price || 1}</p>
          </div>
        </div>

        {/* Pay Now Button */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate(`/payment/${roomNo}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition shadow"
          >
            Pay Now
          </button>
        </div>
      </div>

      {/* Floating Comment Icon */}
      <button
        onClick={() => setShowReviews(!showReviews)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <FaRegCommentDots size={24} />
      </button>

      {/* Reviews Section */}
      {showReviews && (
        <div className="mt-10 w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[400px] animate-slide-up">
          <h3 className="text-xl font-semibold mb-4">Room Reviews</h3>
          <div className="flex flex-col gap-4 mb-4">
           {reviews.length > 0 ? (
reviews.map((r, index) => (
<div key={index} className="border-b pb-2">
<p className="text-gray-700">{r.comment}</p>
</div>
))
) : (

<p className="text-gray-500"> No reviews yet. Be the first to add one! </p> )}
          </div>

          {/* Add Review Form */}
          <form onSubmit={handleAddReview} className="flex gap-2">
            <input
              type="text"
              placeholder="Write your review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default RoomDetailPage;
