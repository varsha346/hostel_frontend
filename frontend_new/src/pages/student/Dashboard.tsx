import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  MessageSquare, 
  Bed, 
  Info,
  User,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const quickStats = [
    { title: "Room Status", value: "Room 205", icon: Bed, color: "success" },
    { title: "Leave Applications", value: "2 Pending", icon: Clock, color: "warning" },
    { title: "Complaints", value: "1 Resolved", icon: CheckCircle, color: "success" },
    { title: "Profile Status", value: "Complete", icon: User, color: "success" }
  ];

  const quickActions = [
    {
      title: "Apply for Leave",
      description: "Submit your leave application for approval",
      icon: Calendar,
      path: "/student/leave",
      color: "primary"
    },
    {
      title: "File Complaint",
      description: "Register any hostel-related complaints",
      icon: MessageSquare,
      path: "/student/complaints",
      color: "destructive"
    },
    {
      title: "Book Room",
      description: "Apply for room booking or change",
      icon: Bed,
      path: "/student/booking",
      color: "accent"
    },
    {
      title: "Room Information",
      description: "View available rooms and their details",
      icon: Info,
      path: "/student/rooms",
      color: "secondary"
    }
  ];

  const recentActivity = [
    { action: "Leave application submitted", time: "2 hours ago", status: "pending" },
    { action: "Room booking approved", time: "1 day ago", status: "approved" },
    { action: "Complaint resolved", time: "3 days ago", status: "resolved" }
  ];

  return (
    <Layout title="Student Dashboard" userType="student">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Welcome back, John!</h2>
          <p className="text-white/90">Student ID: STU2024001 | Room: 205</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" 
                  onClick={() => navigate(action.path)}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full bg-${action.color}/10`}>
                    <action.icon className={`h-6 w-6 text-${action.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest hostel activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    {activity.status === "approved" && <CheckCircle className="h-5 w-5 text-success" />}
                    {activity.status === "pending" && <Clock className="h-5 w-5 text-warning" />}
                    {activity.status === "resolved" && <CheckCircle className="h-5 w-5 text-success" />}
                    <span className="font-medium">{activity.action}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}