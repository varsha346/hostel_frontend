import { useState } from "react";
import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  Calendar, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle,
  Phone,
  MessageSquare,
  AlertTriangle
} from "lucide-react";

export default function Leaves() {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: "L001",
      studentName: "Priya Sharma",
      studentId: "STU2024089",
      room: "Room 203",
      type: "Medical Leave",
      fromDate: "Dec 20, 2024",
      toDate: "Dec 25, 2024",
      duration: "6 days",
      reason: "Surgery scheduled for chronic condition",
      emergencyContact: "+91-9876543210",
      appliedOn: "Dec 18, 2024",
      status: "pending",
      priority: "high"
    },
    {
      id: "L002", 
      studentName: "Rahul Gupta",
      studentId: "STU2024045",
      room: "Room 156",
      type: "Emergency Leave",
      fromDate: "Dec 22, 2024", 
      toDate: "Dec 28, 2024",
      duration: "7 days",
      reason: "Family emergency - father hospitalized",
      emergencyContact: "+91-8765432109",
      appliedOn: "Dec 19, 2024",
      status: "pending",
      priority: "high"
    },
    {
      id: "L003",
      studentName: "Lisa Wang",
      studentId: "STU2024067",
      room: "Room 308",
      type: "Home Visit",
      fromDate: "Dec 24, 2024",
      toDate: "Jan 2, 2025", 
      duration: "10 days",
      reason: "Winter holidays - family visit",
      emergencyContact: "+91-7654321098",
      appliedOn: "Dec 17, 2024",
      status: "pending", 
      priority: "low"
    }
  ]);

  const [processedLeaves, setProcessedLeaves] = useState([
    {
      id: "L004",
      studentName: "John Doe",
      studentId: "STU2024001",
      room: "Room 205",
      type: "Personal Leave", 
      duration: "3 days",
      status: "approved",
      processedDate: "Dec 15, 2024"
    },
    {
      id: "L005",
      studentName: "Sarah Wilson", 
      studentId: "STU2024015",
      room: "Room 112",
      type: "Academic Work",
      duration: "2 days", 
      status: "rejected",
      processedDate: "Dec 14, 2024"
    }
  ]);

  const handleApprove = (leaveId: string) => {
    setLeaveRequests(prev => 
      prev.map(leave => 
        leave.id === leaveId 
          ? { ...leave, status: "approved" }
          : leave
      )
    );
    
    toast({
      title: "Approved",
      description: "Leave request has been approved",
    });
  };

  const handleReject = (leaveId: string) => {
    setLeaveRequests(prev => 
      prev.map(leave => 
        leave.id === leaveId 
          ? { ...leave, status: "rejected" }
          : leave
      )
    );
    
    toast({
      title: "Rejected",
      description: "Leave request has been rejected",
      variant: "destructive",
    });
  };

  return (
    <Layout title="Leave Management" userType="warden">
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
                  <p className="text-2xl font-bold">{leaveRequests.filter(l => l.status === 'pending').length}</p>
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
                  <p className="text-2xl font-bold">{processedLeaves.filter(l => l.status === 'approved').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-destructive/10">
                  <XCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold">{processedLeaves.filter(l => l.status === 'rejected').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">On Leave</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leave Management Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            <TabsTrigger value="processed">Processed Leaves</TabsTrigger>
          </TabsList>

          {/* Pending Requests */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Pending Leave Requests
                </CardTitle>
                <CardDescription>
                  Review and approve student leave applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {leaveRequests.filter(leave => leave.status === 'pending').map((leave) => (
                    <div key={leave.id} className="border rounded-lg p-6 space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{leave.studentName}</h3>
                            <p className="text-sm text-muted-foreground">{leave.studentId} • {leave.room}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              leave.priority === 'high' ? 'destructive' : 
                              leave.priority === 'medium' ? 'default' : 'secondary'
                            }>
                              {leave.priority} priority
                            </Badge>
                            {leave.priority === 'high' && <AlertTriangle className="h-4 w-4 text-destructive" />}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: {leave.id}
                        </div>
                      </div>

                      {/* Leave Type & Duration */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-medium">{leave.type}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Duration: {leave.duration}
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">From Date: </span>
                          {leave.fromDate}
                        </div>
                        <div>
                          <span className="font-medium">To Date: </span>
                          {leave.toDate}
                        </div>
                        <div>
                          <span className="font-medium">Applied On: </span>
                          {leave.appliedOn}
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Reason: </span>
                        {leave.reason}
                      </div>

                      {/* Emergency Contact */}
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Emergency Contact: </span>
                        <span>{leave.emergencyContact}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(leave.id)}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve Leave
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(leave.id)}
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          Call Emergency Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Processed Leaves */}
          <TabsContent value="processed">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Processed Leaves
                </CardTitle>
                <CardDescription>
                  Recently approved and rejected leave applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processedLeaves.map((leave) => (
                    <div key={leave.id} className={`border rounded-lg p-4 ${
                      leave.status === 'approved' ? 'bg-success/5' : 'bg-destructive/5'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {leave.status === 'approved' ? (
                            <CheckCircle className="h-5 w-5 text-success" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive" />
                          )}
                          <div>
                            <h3 className="font-semibold">{leave.studentName}</h3>
                            <p className="text-sm text-muted-foreground">{leave.studentId} • {leave.room}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={
                          leave.status === 'approved' 
                            ? "text-success border-success" 
                            : "text-destructive border-destructive"
                        }>
                          {leave.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3 text-sm">
                        <div>
                          <span className="font-medium">Leave Type: </span>
                          {leave.type}
                        </div>
                        <div>
                          <span className="font-medium">Duration: </span>
                          {leave.duration}
                        </div>
                        <div>
                          <span className="font-medium">Processed Date: </span>
                          {leave.processedDate}
                        </div>
                        <div>
                          <span className="font-medium">ID: </span>
                          {leave.id}
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