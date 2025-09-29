import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Bed,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";

export default function WardenDashboard() {
  const navigate = useNavigate();

  const quickStats = [
    { title: "Total Students", value: "247", icon: Users, color: "primary", change: "+12" },
    { title: "Pending Leaves", value: "8", icon: Clock, color: "warning", change: "+3" },
    { title: "Open Complaints", value: "5", icon: AlertTriangle, color: "destructive", change: "-2" },
    { title: "Available Rooms", value: "35", icon: Bed, color: "success", change: "-5" }
  ];

  const quickActions = [
    {
      title: "Room Bookings",
      description: "Review and approve room booking requests",
      icon: Bed,
      path: "/warden/bookings",
      color: "primary",
      badge: "12 Pending"
    },
    {
      title: "Leave Requests",
      description: "Approve or reject student leave applications",
      icon: Calendar,
      path: "/warden/leaves", 
      color: "warning",
      badge: "8 Pending"
    },
    {
      title: "Complaints",
      description: "Manage and resolve student complaints",
      icon: MessageSquare,
      path: "/warden/complaints",
      color: "destructive",
      badge: "5 Open"
    },
    {
      title: "Room Management",
      description: "View and manage all hostel rooms",
      icon: Users,
      path: "/warden/rooms",
      color: "success",
      badge: "247 Occupied"
    }
  ];

  const recentActivity = [
    { 
      action: "New room booking request", 
      student: "John Doe (STU2024001)",
      time: "10 minutes ago", 
      type: "booking",
      status: "pending"
    },
    { 
      action: "Leave request approved", 
      student: "Sarah Wilson (STU2024015)",
      time: "1 hour ago", 
      type: "leave",
      status: "approved"
    },
    { 
      action: "Complaint resolved", 
      student: "Mike Johnson (STU2024032)",
      time: "2 hours ago", 
      type: "complaint",
      status: "resolved"
    },
    { 
      action: "Room assignment completed", 
      student: "Emma Davis (STU2024048)",
      time: "3 hours ago", 
      type: "booking",
      status: "completed"
    }
  ];

  const urgentAlerts = [
    {
      type: "High Priority Complaint",
      message: "Water leakage reported in Room 305",
      student: "Alex Chen (STU2024067)",
      time: "30 minutes ago"
    },
    {
      type: "Emergency Leave",
      message: "Medical emergency leave request",
      student: "Priya Sharma (STU2024089)",
      time: "1 hour ago"
    }
  ];

  return (
    <Layout title="Warden Dashboard" userType="warden">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Warden!</h2>
          <p className="text-white/90">Managing University Hostel - Block A</p>
        </div>

        {/* Urgent Alerts */}
        {urgentAlerts.length > 0 && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Urgent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {urgentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                    <div>
                      <p className="font-medium text-destructive">{alert.type}</p>
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.student}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{alert.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-success" />
                        <span className="text-xs text-success">{stat.change}</span>
                      </div>
                    </div>
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-${action.color}/10`}>
                      <action.icon className={`h-6 w-6 text-${action.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs bg-${action.color}/10 text-${action.color} font-medium`}>
                    {action.badge}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Manage
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest hostel management activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    {activity.type === "booking" && <Bed className="h-5 w-5 text-primary" />}
                    {activity.type === "leave" && <Calendar className="h-5 w-5 text-warning" />}
                    {activity.type === "complaint" && <MessageSquare className="h-5 w-5 text-destructive" />}
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.student}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {activity.status === "approved" && <CheckCircle className="h-4 w-4 text-success" />}
                      {activity.status === "pending" && <Clock className="h-4 w-4 text-warning" />}
                      {activity.status === "resolved" && <CheckCircle className="h-4 w-4 text-success" />}
                      {activity.status === "completed" && <CheckCircle className="h-4 w-4 text-success" />}
                      <span className={`text-xs capitalize font-medium
                        ${activity.status === "approved" || activity.status === "resolved" || activity.status === "completed" ? "text-success" : ""}
                        ${activity.status === "pending" ? "text-warning" : ""}
                      `}>
                        {activity.status}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
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