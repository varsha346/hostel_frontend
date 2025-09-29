import { useState } from "react";
import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  User, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Settings,
  MessageCircle
} from "lucide-react";

export default function Complaints() {
  const [complaints, setComplaints] = useState([
    {
      id: "C001",
      studentName: "Alex Chen",
      studentId: "STU2024067", 
      room: "Room 305",
      subject: "Water leakage from bathroom ceiling",
      category: "Maintenance",
      priority: "High",
      description: "Continuous water dripping from bathroom ceiling causing damage to personal items. Issue started 3 days ago.",
      submittedOn: "Dec 18, 2024",
      status: "open",
      assignedTo: null
    },
    {
      id: "C002",
      studentName: "Maria Garcia",
      studentId: "STU2024089",
      room: "Room 205", 
      subject: "Wi-Fi connection extremely slow",
      category: "Internet",
      priority: "Medium",
      description: "Internet speed is very slow, cannot attend online classes properly. Download speed less than 1 Mbps.",
      submittedOn: "Dec 17, 2024", 
      status: "in-progress",
      assignedTo: "IT Team"
    },
    {
      id: "C003",
      studentName: "James Wilson",
      studentId: "STU2024045",
      room: "Room 118",
      subject: "Noisy neighbors during study hours",
      category: "Discipline", 
      priority: "Low",
      description: "Loud music and parties in adjacent room (Room 119) during late night study hours. Affecting concentration.",
      submittedOn: "Dec 16, 2024",
      status: "open", 
      assignedTo: null
    },
    {
      id: "C004",
      studentName: "Sophie Turner",
      studentId: "STU2024123",
      room: "Room 208",
      subject: "Broken window lock - security concern",
      category: "Security",
      priority: "High", 
      description: "Window lock is completely broken, concerned about security. Anyone can open from outside.",
      submittedOn: "Dec 15, 2024",
      status: "open",
      assignedTo: null
    }
  ]);

  const [resolvedComplaints] = useState([
    {
      id: "C005",
      studentName: "John Doe", 
      studentId: "STU2024001",
      room: "Room 205",
      subject: "Broken study table",
      category: "Maintenance",
      resolvedOn: "Dec 14, 2024",
      status: "resolved"
    },
    {
      id: "C006",
      studentName: "Sarah Wilson",
      studentId: "STU2024015", 
      room: "Room 112",
      subject: "Mess food quality issue",
      category: "Food & Mess",
      resolvedOn: "Dec 13, 2024", 
      status: "resolved"
    }
  ]);

  const handleStatusChange = (complaintId: string, newStatus: string) => {
    setComplaints(prev =>
      prev.map(complaint =>
        complaint.id === complaintId
          ? { ...complaint, status: newStatus }
          : complaint
      )
    );

    toast({
      title: "Status Updated",
      description: `Complaint status changed to ${newStatus}`,
    });
  };

  const handleAssignComplaint = (complaintId: string, assignee: string) => {
    setComplaints(prev =>
      prev.map(complaint =>
        complaint.id === complaintId
          ? { ...complaint, assignedTo: assignee, status: "in-progress" }
          : complaint
      )
    );

    toast({
      title: "Complaint Assigned",
      description: `Complaint assigned to ${assignee}`,
    });
  };

  const handleResolve = (complaintId: string) => {
    setComplaints(prev =>
      prev.map(complaint =>
        complaint.id === complaintId
          ? { ...complaint, status: "resolved" }
          : complaint
      )
    );

    toast({
      title: "Complaint Resolved",
      description: "Complaint has been marked as resolved",
    });
  };

  return (
    <Layout title="Complaint Management" userType="warden">
      <div className="space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-destructive/10">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Open</p>
                  <p className="text-2xl font-bold">{complaints.filter(c => c.status === 'open').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-warning/10">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{complaints.filter(c => c.status === 'in-progress').length}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold">{resolvedComplaints.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{complaints.length + resolvedComplaints.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Complaint Management Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Complaints</TabsTrigger>
            <TabsTrigger value="resolved">Resolved Complaints</TabsTrigger>
          </TabsList>

          {/* Active Complaints */}
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Active Complaints
                </CardTitle>
                <CardDescription>
                  Manage and resolve student complaints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {complaints.filter(complaint => complaint.status !== 'resolved').map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-6 space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{complaint.subject}</h3>
                            <p className="text-sm text-muted-foreground">
                              {complaint.studentName} • {complaint.studentId} • {complaint.room}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              complaint.priority === 'High' ? 'destructive' : 
                              complaint.priority === 'Medium' ? 'default' : 'secondary'
                            }>
                              {complaint.priority} priority
                            </Badge>
                            <Badge variant="outline">
                              {complaint.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {complaint.status === 'open' && <AlertTriangle className="h-4 w-4 text-destructive" />}
                          {complaint.status === 'in-progress' && <Clock className="h-4 w-4 text-warning" />}
                          <span className={`text-sm capitalize font-medium
                            ${complaint.status === 'open' ? "text-destructive" : ""}
                            ${complaint.status === 'in-progress' ? "text-warning" : ""}
                          `}>
                            {complaint.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Submitted On: </span>
                          {complaint.submittedOn}
                        </div>
                        <div>
                          <span className="font-medium">Assigned To: </span>
                          {complaint.assignedTo || "Unassigned"}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Description: </span>
                        {complaint.description}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <Select onValueChange={(value) => handleStatusChange(complaint.id, value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select onValueChange={(value) => handleAssignComplaint(complaint.id, value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Assign To" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Maintenance Team">Maintenance Team</SelectItem>
                            <SelectItem value="IT Team">IT Team</SelectItem>
                            <SelectItem value="Security Team">Security Team</SelectItem>
                            <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                            <SelectItem value="Administration">Administration</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button
                          size="sm"
                          onClick={() => handleResolve(complaint.id)}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Mark Resolved
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Contact Student
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resolved Complaints */}
          <TabsContent value="resolved">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Resolved Complaints
                </CardTitle>
                <CardDescription>
                  Successfully resolved student complaints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resolvedComplaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4 bg-success/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <div>
                            <h3 className="font-semibold">{complaint.subject}</h3>
                            <p className="text-sm text-muted-foreground">
                              {complaint.studentName} • {complaint.studentId} • {complaint.room}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-success border-success">
                          Resolved
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm">
                        <div>
                          <span className="font-medium">Category: </span>
                          {complaint.category}
                        </div>
                        <div>
                          <span className="font-medium">Resolved On: </span>
                          {complaint.resolvedOn}
                        </div>
                        <div>
                          <span className="font-medium">ID: </span>
                          {complaint.id}
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