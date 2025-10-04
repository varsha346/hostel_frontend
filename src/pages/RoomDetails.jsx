import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function RoomDetailPage() {
  const { roomNo } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => {
   axiosInstance.get("/auth/check").catch(err => console.log(err));

    axiosInstance
      .get(`/rooms/${roomNo}`)
      .then((res) => setRoom(res.data))
      .catch((err) => console.error(err));
  }, [roomNo]);

  if (!room)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-blue-50 to-white">
        <p className="text-xl font-semibold">Loading Room Details...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-50 to-white p-6 flex justify-center items-start">
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
            <p className="text-lg font-semibold">₹{room.fees || 0}</p>
          </div>
        </div>

        {/* Pay Now Button inside the card */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate(`/payment/${roomNo}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition shadow"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPage;
