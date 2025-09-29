import { useState } from "react";
import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export default function Complaints() {
  const [complaintData, setComplaintData] = useState({
    category: "",
    priority: "",
    subject: "",
    description: "",
    location: ""
  });

  const handleSubmit = () => {
    if (!complaintData.category || !complaintData.priority || !complaintData.subject || !complaintData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Complaint registered successfully",
    });

    // Reset form
    setComplaintData({
      category: "",
      priority: "",
      subject: "",
      description: "",
      location: ""
    });
  };

  const complaintHistory = [
    {
      id: "C001",
      subject: "Water leakage in bathroom",
      category: "Maintenance",
      priority: "High",
      status: "resolved",
      submittedOn: "Dec 10, 2024",
      resolvedOn: "Dec 12, 2024",
      description: "Water leakage from bathroom ceiling"
    },
    {
      id: "C002",
      subject: "Wi-Fi connectivity issues",
      category: "Internet",
      priority: "Medium",
      status: "in-progress",
      submittedOn: "Dec 15, 2024",
      resolvedOn: null,
      description: "Slow internet speed in room 205"
    },
    {
      id: "C003",
      subject: "Noisy neighbors",
      category: "Discipline",
      priority: "Low",
      status: "pending",
      submittedOn: "Dec 18, 2024",
      resolvedOn: null,
      description: "Loud music during study hours"
    }
  ];

  return (
    <Layout title="Complaints" userType="student">
      <div className="space-y-8">
        {/* New Complaint Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Register New Complaint
            </CardTitle>
            <CardDescription>
              Report any issues or concerns related to hostel facilities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={complaintData.category} onValueChange={(value) => 
                  setComplaintData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="food">Food & Mess</SelectItem>
                    <SelectItem value="internet">Internet & Wi-Fi</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="discipline">Discipline</SelectItem>
                    <SelectItem value="facilities">Facilities</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select value={complaintData.priority} onValueChange={(value) => 
                  setComplaintData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of the issue"
                  value={complaintData.subject}
                  onChange={(e) => setComplaintData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Room number or area (e.g., Room 205, Common Area)"
                  value={complaintData.location}
                  onChange={(e) => setComplaintData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                placeholder="Please provide detailed information about your complaint..."
                rows={4}
                value={complaintData.description}
                onChange={(e) => setComplaintData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full md:w-auto">
              Submit Complaint
            </Button>
          </CardContent>
        </Card>

        {/* Complaint History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              My Complaints
            </CardTitle>
            <CardDescription>
              Track the status of your submitted complaints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complaintHistory.map((complaint) => (
                <div key={complaint.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="font-semibold">{complaint.subject}</div>
                      <div className="flex items-center gap-1">
                        {complaint.status === "resolved" && <CheckCircle className="h-4 w-4 text-success" />}
                        {complaint.status === "in-progress" && <Clock className="h-4 w-4 text-warning" />}
                        {complaint.status === "pending" && <AlertTriangle className="h-4 w-4 text-destructive" />}
                        <span className={`text-sm capitalize font-medium
                          ${complaint.status === "resolved" ? "text-success" : ""}
                          ${complaint.status === "in-progress" ? "text-warning" : ""}
                          ${complaint.status === "pending" ? "text-destructive" : ""}
                        `}>
                          {complaint.status.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">ID: {complaint.id}</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Category: </span>
                      {complaint.category}
                    </div>
                    <div>
                      <span className="font-medium">Priority: </span>
                      <span className={`
                        ${complaint.priority === "High" || complaint.priority === "Urgent" ? "text-destructive" : ""}
                        ${complaint.priority === "Medium" ? "text-warning" : ""}
                        ${complaint.priority === "Low" ? "text-success" : ""}
                      `}>
                        {complaint.priority}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Submitted: </span>
                      {complaint.submittedOn}
                    </div>
                    <div>
                      <span className="font-medium">Resolved: </span>
                      {complaint.resolvedOn || "Pending"}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{complaint.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}