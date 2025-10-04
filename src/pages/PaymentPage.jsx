import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode"; // install via npm i jwt-decode

const PaymentPage = () => {
  const { roomNo } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get studentId from JWT token stored in cookies
  const getStudentId = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.userId; // adjust field name according to your JWT payload
    } catch (err) {
      console.error("Failed to decode token:", err);
      return null;
    }
  };

  useEffect(() => {
     axiosInstance.get("/auth/check").catch(() => {});
    const studentId = getStudentId();
    if (!studentId) {
      alert("You must be logged in to make a payment.");
      navigate("/login");
      return;
    }

    // Load Razorpay script
    const loadRazorpayScript = () =>
      new Promise((resolve) => {
        if (document.getElementById("razorpay-script")) return resolve(true);
        const script = document.createElement("script");
        script.id = "razorpay-script";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

    const fetchRoomAndPay = async () => {
      try {
        // 1️⃣ Fetch room details
        const roomRes = await axiosInstance.get(`/rooms/${roomNo}`);
        setRoom(roomRes.data);

        // 2️⃣ Check if room is full BEFORE payment
        if (roomRes.data.currOccu >= roomRes.data.size) {
          alert("Room is full! Cannot proceed with payment.");
          navigate(`/rooms/${roomNo}`);
          return;
        }

        // 3️⃣ Load Razorpay SDK
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert("Failed to load Razorpay SDK.");
          return;
        }

        // 4️⃣ Create Razorpay order
        const orderRes = await axiosInstance.post("/api/payment/create-order", {
          amount: 100, // in paise
          roomNo: roomNo,
        });

        const orderData = orderRes.data;

        // 5️⃣ Open Razorpay checkout
        const options = {
          key: orderData.key,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Hostel Room Payment",
          description: `Payment for Room ${roomNo}`,
          order_id: orderData.id,
          handler: async function (response) {
            try {
              // Call backend to save payment and assign student
              await axiosInstance.post("/api/payment/success", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                studentId: studentId,
                roomNo: roomNo,
                amount: orderData.amount,
              });

              alert("Payment successful and student assigned!");
              navigate(`/rooms/${roomNo}`);
            } catch (err) {
              console.error("Error saving payment:", err);
              const errorMsg =
                err.response?.data?.error ||
                "Payment successful but failed to assign student. Contact admin.";
              alert(errorMsg);
              navigate(`/rooms/${roomNo}`);
            }
          },
          prefill: {
            name: "Student Name",
            email: "student@example.com",
          },
          theme: { color: "#4f46e5" },
          modal: {
            ondismiss: function () {
              navigate(`/rooms/${roomNo}`);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Payment failed:", err);
        const errorMsg = err.response?.data?.error || "Payment failed. Check console for details.";
        alert(errorMsg);
        navigate(`/rooms/${roomNo}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomAndPay();
  }, [roomNo, navigate]);

  if (loading || !room)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 via-blue-50 to-white">
        <p className="text-2xl font-semibold mb-4">Loading Room Details...</p>
        <div className="p-6 bg-white shadow rounded-lg w-80 text-center">
          <p>Room No: {roomNo}</p>
          <p>Price: {room?.fees ? `₹${room.fees}` : "Calculating..."}</p>
          <p>Capacity: {room?.size || "N/A"}</p>
        </div>
      </div>
    );

  return null;
};

export default PaymentPage;
