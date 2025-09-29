import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Bed, 
  Users, 
  Wind, 
  Wifi, 
  Car, 
  Coffee,
  Home,
  IndianRupee,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function Rooms() {
  const navigate = useNavigate();

  const roomTypes = [
    {
      id: 1,
      type: "Single AC",
      price: 8000,
      size: "12x10 ft",
      capacity: 1,
      available: 5,
      total: 20,
      features: ["AC", "Wi-Fi", "Study Table", "Wardrobe", "Attached Bathroom"],
      amenities: ["Parking", "Common Kitchen", "Laundry", "Recreation Room"]
    },
    {
      id: 2,
      type: "Single Non-AC",
      price: 6000,
      size: "12x10 ft", 
      capacity: 1,
      available: 8,
      total: 30,
      features: ["Fan", "Wi-Fi", "Study Table", "Wardrobe", "Attached Bathroom"],
      amenities: ["Parking", "Common Kitchen", "Laundry", "Recreation Room"]
    },
    {
      id: 3,
      type: "Double AC",
      price: 5500,
      size: "15x12 ft",
      capacity: 2,
      available: 3,
      total: 15,
      features: ["AC", "Wi-Fi", "2 Study Tables", "2 Wardrobes", "Attached Bathroom"],
      amenities: ["Parking", "Common Kitchen", "Laundry", "Recreation Room"]
    },
    {
      id: 4,
      type: "Double Non-AC",
      price: 4000,
      size: "15x12 ft",
      capacity: 2,
      available: 12,
      total: 25,
      features: ["Fan", "Wi-Fi", "2 Study Tables", "2 Wardrobes", "Attached Bathroom"],
      amenities: ["Parking", "Common Kitchen", "Laundry", "Recreation Room"]
    },
    {
      id: 5,
      type: "Triple AC",
      price: 4500,
      size: "18x12 ft",
      capacity: 3,
      available: 0,
      total: 10,
      features: ["AC", "Wi-Fi", "3 Study Tables", "3 Wardrobes", "Attached Bathroom"],
      amenities: ["Parking", "Common Kitchen", "Laundry", "Recreation Room"]
    },
    {
      id: 6,
      type: "Triple Non-AC",
      price: 3500,
      size: "18x12 ft",
      capacity: 3,
      available: 7,
      total: 20,
      features: ["Fan", "Wi-Fi", "3 Study Tables", "3 Wardrobes", "Attached Bathroom"],
      amenities: ["Parking", "Common Kitchen", "Laundry", "Recreation Room"]
    }
  ];

  const hostelAmenities = [
    { name: "24/7 Security", icon: Home },
    { name: "Wi-Fi Internet", icon: Wifi },
    { name: "Parking Space", icon: Car },
    { name: "Common Kitchen", icon: Coffee },
    { name: "Recreation Room", icon: Users },
    { name: "Laundry Service", icon: Wind }
  ];

  return (
    <Layout title="Room Information" userType="student">
      <div className="space-y-8">
        {/* Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardHeader>
            <CardTitle>University Hostel Room Types</CardTitle>
            <CardDescription>
              Explore different room options and their amenities. Choose the perfect accommodation for your stay.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Room Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roomTypes.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    {room.type}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-4 w-4" />
                    <span className="text-2xl font-bold">{room.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Size: {room.size}</span>
                  <span>Capacity: {room.capacity} person{room.capacity > 1 ? 's' : ''}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Availability */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {room.available > 0 ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    <span className="font-medium">
                      {room.available > 0 ? `${room.available} Available` : 'Fully Occupied'}
                    </span>
                  </div>
                  <Badge variant={room.available > 0 ? "default" : "destructive"}>
                    {room.available}/{room.total} rooms
                  </Badge>
                </div>

                {/* Room Features */}
                <div>
                  <h4 className="font-medium mb-2">Room Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="font-medium mb-2">Hostel Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/student/booking")}
                  disabled={room.available === 0}
                >
                  {room.available > 0 ? 'Book This Room' : 'Currently Full'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hostel Amenities */}
        <Card>
          <CardHeader>
            <CardTitle>Hostel Amenities</CardTitle>
            <CardDescription>
              Common facilities available to all residents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {hostelAmenities.map((amenity, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <amenity.icon className="h-8 w-8 text-primary mb-2" />
                  <span className="text-sm font-medium text-center">{amenity.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing Information */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Payment Schedule</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Monthly payment due on 1st of each month</li>
                  <li>• Security deposit: 2 months rent (refundable)</li>
                  <li>• Late payment fee: ₹500 after 10th of month</li>
                  <li>• Electricity charges: As per usage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Included Services</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Wi-Fi internet connection</li>
                  <li>• Room cleaning (weekly)</li>
                  <li>• Common area maintenance</li>
                  <li>• 24/7 security services</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}