import { useState } from "react";
import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Bed, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function Booking() {
  const [bookingData, setBookingData] = useState({
    roomType: "",
    preferredFloor: "",
    roommates: "",
    reason: "",
    moveInDate: ""
  });

  const handleSubmit = () => {
    if (!bookingData.roomType || !bookingData.reason || !bookingData.moveInDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Room booking request submitted successfully",
    });

    // Reset form
    setBookingData({
      roomType: "",
      preferredFloor: "",
      roommates: "",
      reason: "",
      moveInDate: ""
    });
  };

  const bookingHistory = [
    {
      id: "B001",
      roomType: "Single AC",
      requestedFloor: "2nd Floor",
      status: "approved",
      requestDate: "Dec 1, 2024",
      approvedDate: "Dec 3, 2024",
      assignedRoom: "Room 205"
    },
    {
      id: "B002",
      roomType: "Double Non-AC",
      requestedFloor: "1st Floor", 
      status: "pending",
      requestDate: "Dec 15, 2024",
      approvedDate: null,
      assignedRoom: null
    },
    {
      id: "B003",
      roomType: "Single AC",
      requestedFloor: "3rd Floor",
      status: "rejected",
      requestDate: "Nov 20, 2024",
      approvedDate: null,
      assignedRoom: null
    }
  ];

  const currentBooking = {
    room: "Room 205",
    type: "Single AC",
    floor: "2nd Floor",
    checkIn: "Dec 3, 2024",
    monthlyFee: "₹8,000"
  };

  return (
    <Layout title="Room Booking" userType="student">
      <div className="space-y-8">
        {/* Current Room Status */}
        <Card className="bg-gradient-to-r from-success/10 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              Current Room Assignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Room Number</p>
                <p className="text-lg font-semibold">{currentBooking.room}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Room Type</p>
                <p className="text-lg font-semibold">{currentBooking.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Floor</p>
                <p className="text-lg font-semibold">{currentBooking.floor}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Check-in Date</p>
                <p className="text-lg font-semibold">{currentBooking.checkIn}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Fee</p>
                <p className="text-lg font-semibold text-primary">{currentBooking.monthlyFee}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Booking Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              Request Room Change/Booking
            </CardTitle>
            <CardDescription>
              Apply for a new room or room change
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="room-type">Room Type *</Label>
                <Select value={bookingData.roomType} onValueChange={(value) => 
                  setBookingData(prev => ({ ...prev, roomType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-ac">Single AC</SelectItem>
                    <SelectItem value="single-non-ac">Single Non-AC</SelectItem>
                    <SelectItem value="double-ac">Double AC</SelectItem>
                    <SelectItem value="double-non-ac">Double Non-AC</SelectItem>
                    <SelectItem value="triple-ac">Triple AC</SelectItem>
                    <SelectItem value="triple-non-ac">Triple Non-AC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred-floor">Preferred Floor</Label>
                <Select value={bookingData.preferredFloor} onValueChange={(value) => 
                  setBookingData(prev => ({ ...prev, preferredFloor: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select floor preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ground">Ground Floor</SelectItem>
                    <SelectItem value="first">1st Floor</SelectItem>
                    <SelectItem value="second">2nd Floor</SelectItem>
                    <SelectItem value="third">3rd Floor</SelectItem>
                    <SelectItem value="fourth">4th Floor</SelectItem>
                    <SelectItem value="any">No Preference</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roommates">Preferred Roommates</Label>
                <Input
                  id="roommates"
                  placeholder="Student IDs (comma separated)"
                  value={bookingData.roommates}
                  onChange={(e) => setBookingData(prev => ({ ...prev, roommates: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="move-in-date">Preferred Move-in Date *</Label>
                <Input
                  id="move-in-date"
                  type="date"
                  value={bookingData.moveInDate}
                  onChange={(e) => setBookingData(prev => ({ ...prev, moveInDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Request *</Label>
              <Textarea
                id="reason"
                placeholder="Please provide reason for room change or booking..."
                rows={4}
                value={bookingData.reason}
                onChange={(e) => setBookingData(prev => ({ ...prev, reason: e.target.value }))}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full md:w-auto">
              Submit Booking Request
            </Button>
          </CardContent>
        </Card>

        {/* Booking History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Booking History
            </CardTitle>
            <CardDescription>
              Track your room booking requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookingHistory.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="font-semibold">{booking.roomType}</div>
                      <div className="flex items-center gap-1">
                        {booking.status === "approved" && <CheckCircle className="h-4 w-4 text-success" />}
                        {booking.status === "pending" && <Clock className="h-4 w-4 text-warning" />}
                        {booking.status === "rejected" && <XCircle className="h-4 w-4 text-destructive" />}
                        <span className={`text-sm capitalize font-medium
                          ${booking.status === "approved" ? "text-success" : ""}
                          ${booking.status === "pending" ? "text-warning" : ""}
                          ${booking.status === "rejected" ? "text-destructive" : ""}
                        `}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">ID: {booking.id}</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Requested Floor: </span>
                      {booking.requestedFloor}
                    </div>
                    <div>
                      <span className="font-medium">Request Date: </span>
                      {booking.requestDate}
                    </div>
                    <div>
                      <span className="font-medium">Approved Date: </span>
                      {booking.approvedDate || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Assigned Room: </span>
                      {booking.assignedRoom || "N/A"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}