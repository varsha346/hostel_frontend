import { useState } from "react";
import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bed, 
  Users, 
  Search, 
  Filter,
  Home,
  IndianRupee,
  User,
  Phone,
  Mail
} from "lucide-react";

export default function Rooms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [floorFilter, setFloorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const rooms = [
    {
      id: "R001",
      number: "101",
      floor: "Ground Floor", 
      type: "Single AC",
      capacity: 1,
      occupied: 1,
      rent: 8000,
      status: "occupied",
      occupants: [
        {
          name: "John Doe",
          studentId: "STU2024001",
          phone: "+91-9876543210",
          email: "john.doe@university.edu",
          checkIn: "Dec 1, 2024"
        }
      ]
    },
    {
      id: "R002", 
      number: "102",
      floor: "Ground Floor",
      type: "Double AC",
      capacity: 2,
      occupied: 2,
      rent: 5500,
      status: "occupied",
      occupants: [
        {
          name: "Sarah Wilson",
          studentId: "STU2024015",
          phone: "+91-8765432109", 
          email: "sarah.wilson@university.edu",
          checkIn: "Nov 15, 2024"
        },
        {
          name: "Emma Davis",
          studentId: "STU2024048",
          phone: "+91-7654321098",
          email: "emma.davis@university.edu", 
          checkIn: "Dec 5, 2024"
        }
      ]
    },
    {
      id: "R003",
      number: "103", 
      floor: "Ground Floor",
      type: "Single Non-AC",
      capacity: 1,
      occupied: 0,
      rent: 6000,
      status: "available",
      occupants: []
    },
    {
      id: "R004",
      number: "201",
      floor: "1st Floor",
      type: "Triple Non-AC",
      capacity: 3,
      occupied: 1,
      rent: 3500,
      status: "partially-occupied",
      occupants: [
        {
          name: "Mike Johnson",
          studentId: "STU2024032",
          phone: "+91-6543210987",
          email: "mike.johnson@university.edu",
          checkIn: "Oct 20, 2024"
        }
      ]
    },
    {
      id: "R005",
      number: "205",
      floor: "1st Floor", 
      type: "Single AC",
      capacity: 1,
      occupied: 1,
      rent: 8000,
      status: "occupied",
      occupants: [
        {
          name: "Alex Chen",
          studentId: "STU2024067",
          phone: "+91-5432109876",
          email: "alex.chen@university.edu",
          checkIn: "Sep 10, 2024"
        }
      ]
    },
    {
      id: "R006",
      number: "301",
      floor: "2nd Floor",
      type: "Double Non-AC", 
      capacity: 2,
      occupied: 0,
      rent: 4000,
      status: "maintenance",
      occupants: []
    },
    {
      id: "R007",
      number: "305",
      floor: "2nd Floor",
      type: "Single AC",
      capacity: 1,
      occupied: 1,
      rent: 8000,
      status: "occupied",
      occupants: [
        {
          name: "Priya Sharma",
          studentId: "STU2024089",
          phone: "+91-4321098765", 
          email: "priya.sharma@university.edu",
          checkIn: "Aug 25, 2024"
        }
      ]
    },
    {
      id: "R008",
      number: "312",
      floor: "2nd Floor",
      type: "Triple AC",
      capacity: 3,
      occupied: 0,
      rent: 4500,
      status: "available",
      occupants: []
    }
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.includes(searchTerm) || 
                         room.occupants.some(occupant => 
                           occupant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           occupant.studentId.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesFloor = floorFilter === "all" || room.floor === floorFilter;
    const matchesStatus = statusFilter === "all" || room.status === statusFilter;
    
    return matchesSearch && matchesFloor && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "occupied":
        return <Badge variant="destructive">Occupied</Badge>;
      case "available":
        return <Badge variant="default">Available</Badge>;
      case "partially-occupied":
        return <Badge variant="secondary">Partially Occupied</Badge>;
      case "maintenance":
        return <Badge variant="outline">Under Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const occupancyStats = {
    total: rooms.length,
    occupied: rooms.filter(r => r.status === "occupied").length,
    available: rooms.filter(r => r.status === "available").length,
    partiallyOccupied: rooms.filter(r => r.status === "partially-occupied").length,
    maintenance: rooms.filter(r => r.status === "maintenance").length
  };

  return (
    <Layout title="Room Management" userType="warden">
      <div className="space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                  <p className="text-xl font-bold">{occupancyStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-destructive/10">
                  <Users className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Occupied</p>
                  <p className="text-xl font-bold">{occupancyStats.occupied}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-success/10">
                  <Bed className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available</p>
                  <p className="text-xl font-bold">{occupancyStats.available}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-warning/10">
                  <User className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Partial</p>
                  <p className="text-xl font-bold">{occupancyStats.partiallyOccupied}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-muted/50">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
                  <p className="text-xl font-bold">{occupancyStats.maintenance}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by room number, student name, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={floorFilter} onValueChange={setFloorFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Floors</SelectItem>
                  <SelectItem value="Ground Floor">Ground Floor</SelectItem>
                  <SelectItem value="1st Floor">1st Floor</SelectItem>
                  <SelectItem value="2nd Floor">2nd Floor</SelectItem>
                  <SelectItem value="3rd Floor">3rd Floor</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="partially-occupied">Partially Occupied</SelectItem>
                  <SelectItem value="maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    Room {room.number}
                  </CardTitle>
                  {getStatusBadge(room.status)}
                </div>
                <CardDescription>
                  {room.floor} • {room.type}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Room Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Capacity: </span>
                    {room.capacity} person{room.capacity > 1 ? 's' : ''}
                  </div>
                  <div>
                    <span className="font-medium">Occupied: </span>
                    {room.occupied}/{room.capacity}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  <span className="text-lg font-semibold">₹{room.rent.toLocaleString()}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                {/* Occupants */}
                {room.occupants.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Occupants:</h4>
                    {room.occupants.map((occupant, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{occupant.name}</span>
                          <span className="text-xs text-muted-foreground">{occupant.studentId}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {occupant.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {occupant.email}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Check-in: {occupant.checkIn}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {room.occupants.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    {room.status === "available" ? "Available for booking" : 
                     room.status === "maintenance" ? "Under maintenance" : "No occupants"}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  {room.status === "maintenance" && (
                    <Button size="sm" className="flex-1">
                      Mark Available
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No rooms found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}