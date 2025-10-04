// RoomsPage.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";



const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingRoom, setDeletingRoom] = useState(null);
  const [newRoom, setNewRoom] = useState({
    roomNo: "",
    category: "SINGLE",
    size: "",
    fees: "",
    description: "",
    photos: ""
  });
  const navigate = useNavigate();

  // Fetch rooms
  useEffect(() => {
     
    // trigger one call so interceptor can catch invalid sessions
    axiosInstance.get("/auth/check").catch(() => {});
  

    const fetchRooms = async () => {
      try {
        const res = await axiosInstance.get("/rooms/rooms-view?showAll=true");
        setRooms(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRooms();
  }, []);

  // Filter rooms
  const filteredRooms = filter === "All" ? rooms : rooms.filter(r => r.category === filter.toUpperCase());

  // Handle input change
  const handleChange = (e) => setNewRoom({ ...newRoom, [e.target.name]: e.target.value });

  // Create room
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const roomData = {
        ...newRoom,
        roomNo: Number(newRoom.roomNo),
        size: Number(newRoom.size),
        fees: Number(newRoom.fees),
        photos: newRoom.photos ? newRoom.photos.split(",").map(url => url.trim()) : []
      };
      await axiosInstance.post("/rooms", roomData);
      setIsModalOpen(false);
      setNewRoom({ roomNo: "", category: "SINGLE", size: "", fees: "", description: "", photos: "" });
      const res = await axiosInstance.get("/rooms/rooms-view?showAll=true");
      setRooms(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to create room. Check console for details.");
    }
  };

  // Delete room
  const handleDeleteRoom = async (roomNo) => {
    if (!window.confirm(`Delete room #${roomNo}? This action cannot be undone.`)) return;
    try {
      setDeletingRoom(roomNo);
      await axiosInstance.delete(`/rooms/${roomNo}`);
      setRooms(prev => prev.filter(r => r.roomNo !== roomNo));
    } catch (err) {
      console.error(err);
      alert("Failed to delete room. Check console for details.");
    } finally {
      setDeletingRoom(null);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-purple-100 via-blue-50 to-white">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Rooms</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Create Room
        </button>
      </header>

      {/* FILTER */}
      <select
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="p-2 border rounded w-full mb-6"
      >
        <option>All</option>
        <option>SINGLE</option>
        <option>DOUBLE</option>
        <option>TRIPLE</option>
        <option>SUITE</option>
      </select>

      {/* ROOMS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRooms.length > 0 ? filteredRooms.map(room => (
          <div
            key={room.roomNo}
            className="p-4 bg-white rounded shadow hover:shadow-lg cursor-pointer relative"
            onClick={() => navigate(`/room/${room.roomNo}`)}
          >
            {/* Delete button */}
            <button
              aria-label={`Delete room ${room.roomNo}`}
              onClick={e => { e.stopPropagation(); handleDeleteRoom(room.roomNo); }}
              disabled={deletingRoom === room.roomNo}
              className={`absolute top-2 right-2 ${deletingRoom === room.roomNo ? "opacity-50 cursor-wait" : "text-red-500 hover:text-red-700"}`}
            >
              <Trash2 size={18}/>
            </button>

            <h3 className="font-bold text-lg">Room {room.roomNo}</h3>
            <p>Category: {room.category}</p>
            <p>Size: {room.size}</p>
            <p>Occupied: {room.currOccu}/{room.size}</p>
            <p>Fees: ₹{room.fees}</p>
            <p>Description: {room.description}</p>

            {/* PHOTOS */}
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {room.photos?.map((url, idx) => (
                <img key={idx} src={url} alt={`Room ${room.roomNo}`} className="w-20 h-20 object-cover rounded"/>
              ))}
            </div>
          </div>
        )) : <p>No rooms available.</p>}
      </div>

      {/* CREATE ROOM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Room</h2>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label>Room No</label>
                <input
                  type="number"
                  name="roomNo"
                  value={newRoom.roomNo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label>Category</label>
                <select
                  name="category"
                  value={newRoom.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option>SINGLE</option>
                  <option>DOUBLE</option>
                  <option>TRIPLE</option>
                  <option>SUITE</option>
                </select>
              </div>

              <div>
                <label>Size</label>
                <input type="number" name="size" value={newRoom.size} onChange={handleChange} className="w-full p-2 border rounded" required/>
              </div>

              <div>
                <label>Fees</label>
                <input type="number" name="fees" value={newRoom.fees} onChange={handleChange} className="w-full p-2 border rounded" required/>
              </div>

              <div>
                <label>Description</label>
                <textarea name="description" value={newRoom.description} onChange={handleChange} className="w-full p-2 border rounded"/>
              </div>

              <div>
                <label>Photos (comma separated URLs)</label>
                <input
                  type="text"
                  name="photos"
                  value={newRoom.photos}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="https://example.com/photo1.jpg,https://example.com/photo2.jpg"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-400 px-4 py-2 rounded text-white hover:bg-gray-500">Cancel</button>
                <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
