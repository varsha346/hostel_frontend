import { useState } from "react";
import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  Bed, 
  User, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  MessageSquare
} from "lucide-react";

export default function Bookings() {
  const [bookingRequests, setBookingRequests] = useState([
    {
      id: "B001",
      studentName: "John Doe", 
      studentId: "STU2024001",
      currentRoom: "Room 205",
      requestedType: "Single AC",
      preferredFloor: "3rd Floor",
      requestDate: "Dec 18, 2024",
      moveInDate: "Dec 25, 2024",
      reason: "Current room has heating issues, need AC facility",
      status: "pending",
      priority: "high"
    },
    {
      id: "B002",
      studentName: "Sarah Wilson",
      studentId: "STU2024015", 
      currentRoom: "New Student",
      requestedType: "Double Non-AC",
      preferredFloor: "2nd Floor",
      requestDate: "Dec 17, 2024",
      moveInDate: "Jan 1, 2025",
      reason: "New admission, need accommodation",
      status: "pending",
      priority: "medium"
    },
    {
      id: "B003",
      studentName: "Mike Johnson",
      studentId: "STU2024032",
      currentRoom: "Room 118",
      requestedType: "Single Non-AC", 
      preferredFloor: "1st Floor",
      requestDate: "Dec 16, 2024",
      moveInDate: "Dec 30, 2024",
      reason: "Want private room for better study environment",
      status: "pending",
      priority: "low"
    }
  ]);

  const [approvedBookings, setApprovedBookings] = useState([
    {
      id: "B004",
      studentName: "Emma Davis",
      studentId: "STU2024048",
      assignedRoom: "Room 312",
      roomType: "Single AC",
      approvedDate: "Dec 15, 2024",
      moveInDate: "Dec 20, 2024",
      status: "approved"
    },
    {
      id: "B005", 
      studentName: "Alex Chen",
      studentId: "STU2024067",
      assignedRoom: "Room 208",
      roomType: "Double AC",
      approvedDate: "Dec 14, 2024",
      moveInDate: "Dec 18, 2024",
      status: "approved"
    }
  ]);

  const handleApprove = (bookingId: string, assignedRoom: string) => {
    setBookingRequests(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: "approved" }
          : booking
      )
    );
    
    toast({
      title: "Approved",
      description: `Booking request approved and room ${assignedRoom} assigned`,
    });
  };

  const handleReject = (bookingId: string, reason: string) => {
    setBookingRequests(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: "rejected" }
          : booking
      )
    );
    
    toast({
      title: "Rejected",
      description: "Booking request has been rejected",
      variant: "destructive",
    });
  };

  return (
    <Layout title="Room Booking Management" userType="warden">
      <div className="space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-warning/10">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{bookingRequests.filter(b => b.status === 'pending').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-success/10">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">{approvedBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Bed className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Rooms</p>
                  <p className="text-2xl font-bold">35</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <User className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">247</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Management Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            <TabsTrigger value="approved">Approved Bookings</TabsTrigger>
          </TabsList>

          {/* Pending Requests */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Pending Booking Requests
                </CardTitle>
                <CardDescription>
                  Review and approve room booking requests from students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {bookingRequests.filter(booking => booking.status === 'pending').map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-6 space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{booking.studentName}</h3>
                            <p className="text-sm text-muted-foreground">{booking.studentId}</p>
                          </div>
                          <Badge variant={
                            booking.priority === 'high' ? 'destructive' : 
                            booking.priority === 'medium' ? 'default' : 'secondary'
                          }>
                            {booking.priority} priority
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: {booking.id}
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Current Room: </span>
                          {booking.currentRoom}
                        </div>
                        <div>
                          <span className="font-medium">Requested Type: </span>
                          {booking.requestedType}
                        </div>
                        <div>
                          <span className="font-medium">Preferred Floor: </span>
                          {booking.preferredFloor}
                        </div>
                        <div>
                          <span className="font-medium">Request Date: </span>
                          {booking.requestDate}
                        </div>
                        <div>
                          <span className="font-medium">Move-in Date: </span>
                          {booking.moveInDate}
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Reason: </span>
                        {booking.reason}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(booking.id, "Room 315")}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve & Assign Room
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(booking.id, "No suitable rooms available")}
                          className="flex items-center gap-2"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Contact Student
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approved Bookings */}
          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Approved Bookings
                </CardTitle>
                <CardDescription>
                  Recently approved room bookings and assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 bg-success/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <div>
                            <h3 className="font-semibold">{booking.studentName}</h3>
                            <p className="text-sm text-muted-foreground">{booking.studentId}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-success border-success">
                          Approved
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3 text-sm">
                        <div>
                          <span className="font-medium">Assigned Room: </span>
                          {booking.assignedRoom}
                        </div>
                        <div>
                          <span className="font-medium">Room Type: </span>
                          {booking.roomType}
                        </div>
                        <div>
                          <span className="font-medium">Approved Date: </span>
                          {booking.approvedDate}
                        </div>
                        <div>
                          <span className="font-medium">Move-in Date: </span>
                          {booking.moveInDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}